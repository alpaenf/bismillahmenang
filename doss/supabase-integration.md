# AntiScam — Dokumen Integrasi Backend Supabase

Dokumen ini berfungsi sebagai panduan arsitektur, skema database, kebijakan keamanan (RLS), serta roadmap implementasi backend **Supabase** untuk proyek **AntiScam**. 

---

## 1. Ringkasan Arsitektur Backend

AntiScam memanfaatkan **Supabase** sebagai *Backend-as-a-Service* (BaaS) yang terintegrasi secara *native* dengan **Next.js 14 (App Router)**.

```
+-----------------------------------------------------------------------+
|                         AntiScam Frontend                             |
|                        (Next.js 14 App Router)                        |
+-----------------------------------------------------------------------+
        |                                       |
        v (Public / User Auth)                  v (Server-Side / Secret)
+-------------------------------+       +-------------------------------+
|    @supabase/ssr (Client)     |       | Next.js Route Handlers /      |
| - Read Public Scam Database   |       | Server Actions & AI Engine    |
| - Read User History           |       | - OpenAI / DeepSeek API       |
| - Auth (Google / Email)       |       | - Supabase Service Role       |
+-------------------------------+       +-------------------------------+
        |                                       |
        +-------------------+-------------------+
                            |
                            v
+-----------------------------------------------------------------------+
|                           SUPABASE CLOUD                              |
|  +-----------------------------------------------------------------+  |
|  | PostgreSQL Database (JSONB, Vector / Full-text Search, RLS)     |  |
|  +-----------------------------------------------------------------+  |
|  | Auth (GoTrue) & Session Management                              |  |
|  +-----------------------------------------------------------------+  |
|  | Edge Functions (Optional for Webhooks / Background Tasks)       |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### Keunggulan Penggunaan Supabase pada AntiScam:
1. **PostgreSQL + JSONB**: Fleksibel menyimpan hasil analisis terstruktur (indikator ancaman, *escalation flow*, rekomendasi).
2. **Built-in Auth**: Kemudahan login dengan Email/OTP atau OAuth (Google).
3. **Row Level Security (RLS)**: Menjamin data riwayat pengguna hanya dapat diakses oleh pemiliknya.
4. **Integration with Next.js SSR**: Menggunakan `@supabase/ssr` untuk autentikasi yang *seamless* di Server Components & Middleware.

---

## 2. Skema Database PostgreSQL (DDL & SQL Migration)

Berikut adalah struktur tabel SQL yang siap dieksekusi di **Supabase SQL Editor**:

```sql
-- Enable Extension (jika diperlukan untuk UUID & Vector search nantinya)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- 1. TABEL PROFILES (Tersinkronisasi otomatis dengan Supabase Auth)
-- =====================================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'analyst')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger untuk membuat profile otomatis saat user register di Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================================================================
-- 2. TABEL ANALYSIS_HISTORY (Riwayat Analisis Pesan & WhatsApp)
-- =====================================================================
CREATE TABLE public.analysis_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- NULL jika anonim
    session_type TEXT NOT NULL CHECK (session_type IN ('single_message', 'whatsapp_chat')),
    input_text TEXT,                           -- Teks mentah jika single message
    whatsapp_messages JSONB,                    -- Array bubble chat jika WhatsApp
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    risk_score INT NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
    detected_scam_type TEXT,                    -- Misal: "Phishing Hadiah", "Malware APK"
    summary TEXT NOT NULL,
    indicators JSONB NOT NULL DEFAULT '[]'::jsonb,      -- Array ThreatIndicator
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array RecommendedAction
    escalation_flow JSONB DEFAULT '[]'::jsonb,         -- Array EscalationPhase (khusus WA)
    flagged_messages JSONB DEFAULT '[]'::jsonb,        -- Bubble bermasalah (khusus WA)
    client_ip TEXT,                            -- Untuk rate limiting anonim
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing untuk pencarian cepat
CREATE INDEX idx_analysis_user_id ON public.analysis_history(user_id);
CREATE INDEX idx_analysis_risk_level ON public.analysis_history(risk_level);
CREATE INDEX idx_analysis_created_at ON public.analysis_history(created_at DESC);


-- =====================================================================
-- 3. TABEL REPORTED_SCAMS (Database Laporan & Blacklist Komunitas)
-- =====================================================================
CREATE TABLE public.reported_scams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    scam_type TEXT NOT NULL,                    -- Misal: "Phone Number", "Phishing URL", "APK Hash"
    target_value TEXT NOT NULL,                 -- Misal: "08123456789" atau "https://penipuan.club"
    description TEXT,
    evidence_urls TEXT[],                      -- URL screenshot bukti
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    upvote_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reported_scams_target ON public.reported_scams(target_value);


-- =====================================================================
-- 4. TABEL FEEDBACK_LOGS (Umpan Balik Akurasi Analisis)
-- =====================================================================
CREATE TABLE public.feedback_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES public.analysis_history(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_helpful BOOLEAN NOT NULL,
    user_comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Kebijakan Keamanan (Row Level Security / RLS)

Supabase mewajibkan RLS aktif di semua tabel agar data terproteksi dengan aman di level PostgreSQL.

```sql
-- 1. Enable RLS di semua tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reported_scams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_logs ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk PROFILES
-- Publik bisa baca profil dasar, user hanya bisa edit profil miliknya sendiri
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile."
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Policy untuk ANALYSIS_HISTORY
-- Guest/Anonim & User bisa insert hasil analisis
CREATE POLICY "Anyone can create analysis history"
    ON public.analysis_history FOR INSERT WITH CHECK (true);

-- User hanya bisa melihat riwayat miliknya sendiri
CREATE POLICY "Users can view own analysis history"
    ON public.analysis_history FOR SELECT
    USING (auth.uid() = user_id);

-- 4. Policy untuk REPORTED_SCAMS
-- Publik bisa melihat laporan yang sudah terverifikasi (status = 'verified')
CREATE POLICY "Public can view verified scams"
    ON public.reported_scams FOR SELECT
    USING (status = 'verified' OR auth.uid() = reporter_id);

-- User terautentikasi bisa membuat laporan baru
CREATE POLICY "Authenticated users can submit scam reports"
    ON public.reported_scams FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');
```

---

## 4. Setup Client & Environment Variables di Next.js

### 4.1 Dependency yang Diperlukan
Jalankan di terminal project:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 4.2 File Konfigurasi Environment (`.env.local`)
Buat atau perbarui file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Model Provider (Opsional untuk Engine Deteksi)
OPENAI_API_KEY=sk-...
```

### 4.3 Client Helper (`src/lib/supabase/`)

#### a. Browser Client (`src/lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### b. Server Client (`src/lib/supabase/server.ts`)
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Dipanggil dari Server Component
          }
        },
      },
    }
  )
}
```

---

## 5. Implementasi Route Handlers (API Endpoints)

### `src/app/api/v1/analyze/message/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messageText } = body

    if (!messageText || messageText.trim() === '') {
      return NextResponse.json(
        { error: 'Teks pesan wajib diisi.' },
        { status: 400 }
      )
    }

    // 1. Eksekusi Engine Analisis (Aturan Heuristik + AI API)
    // TODO: Panggil fungsi analisis AI / Rule Engine
    const analysisResult = {
      riskLevel: 'high',
      riskScore: 78,
      detectedScamType: 'Phishing Pembagian Hadiah',
      summary: 'Pesan ini terindikasi penipuan yang meminta pengguna mengeklik tautan mencurigakan.',
      indicators: [
        {
          id: 'ind_1',
          category: 'suspicious_link',
          title: 'Link Tidak Resmi',
          description: 'Menggunakan domain gratisan/mencurigakan.',
          severity: 'high'
        }
      ],
      recommendations: [
        {
          id: 'rec_1',
          priority: 'must_do',
          actionText: 'Jangan klik link tersebut',
          explanation: 'Link dapat mengarahkan ke halaman pencurian data.'
        }
      ]
    }

    // 2. Simpan Riwayat ke Supabase Database
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const { data: insertedData, error: dbError } = await supabase
      .from('analysis_history')
      .insert({
        user_id: session?.user?.id || null,
        session_type: 'single_message',
        input_text: messageText,
        risk_level: analysisResult.riskLevel,
        risk_score: analysisResult.riskScore,
        detected_scam_type: analysisResult.detectedScamType,
        summary: analysisResult.summary,
        indicators: analysisResult.indicators,
        recommendations: analysisResult.recommendations,
      })
      .select('id, created_at')
      .single()

    if (dbError) {
      console.error('Database save error:', dbError)
    }

    return NextResponse.json({
      id: insertedData?.id || `temp_${Date.now()}`,
      timestamp: insertedData?.created_at || new Date().toISOString(),
      ...analysisResult
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Gagal memproses analisis pesan.' },
      { status: 500 }
    )
  }
}
```

---

## 6. Tahapan (Roadmap) Pengerjaan Backend

| Tahap | Fokus Pekerjaan | Detail Tugas | Output |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **Setup Supabase Project** | 1. Buat project di [supabase.com](https://supabase.com).<br>2. Jalankan SQL DDL pada Bab 2 di SQL Editor.<br>3. Konfigurasi RLS & trigger profil. | Database siap di cloud. |
| **Fase 2** | **Integrasi Project Next.js** | 1. Install `@supabase/supabase-js` dan `@supabase/ssr`.<br>2. Isikan `.env.local`.<br>3. Buat helper client `lib/supabase/`. | Frontend terhubung dengan Supabase SDK. |
| **Fase 3** | **API Route Handlers & AI Engine** | 1. Buat endpoint `POST /api/v1/analyze/message`.<br>2. Buat endpoint `POST /api/v1/analyze/whatsapp`.<br>3. Integrasikan engine deteksi (LLM OpenAI/DeepSeek / Regex heuristic). | Analisis berjalan & hasil tersimpan di DB. |
| **Fase 4** | **Halaman Riwayat & Fitur Bookmark** | 1. Buat halaman `/history` untuk pengguna terautentikasi.<br>2. Fetch data dari tabel `analysis_history`. | User bisa melihat riwayat analisis terdahulu. |
| **Fase 5** | **Fitur Autentikasi (Auth)** | 1. Aktifkan provider Login Google & Email di Supabase Dashboard.<br>2. Buat modal / halaman Login di Next.js.<br>3. Tambahkan middleware proteksi rute. | User bisa login & menyimpan data secara terikat. |

---

## 7. Referensi File Dokumen Terkait
- [Spesifikasi API & Kontrak Data](file:///c:/laragon/www/antiscam%20-%20Salin/doss/api-spec.md)
- [Product Requirements Document (PRD)](file:///c:/laragon/www/antiscam%20-%20Salin/doss/prd.md)
- [Arsitektur Sistem](file:///c:/laragon/www/antiscam%20-%20Salin/doss/architecture.md)
