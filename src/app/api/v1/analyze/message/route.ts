import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { SingleAnalysisRequest, SingleAnalysisResponse, RiskLevel, ThreatIndicator, RecommendedAction } from '@/types/analysis';
import { analyzeMessageWithGroq } from '@/lib/ai/groqService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body: SingleAnalysisRequest = await request.json();
    const { messageText } = body;

    if (!messageText || !messageText.trim()) {
      return NextResponse.json(
        { error: 'Teks pesan wajib diisi.' },
        { status: 400 }
      );
    }

    let riskLevel: RiskLevel = 'low';
    let riskScore = 15;
    let detectedScamType = 'Pesan Normal / Risiko Rendah';
    let summary = 'Pesan ini terlihat aman dan belum menunjukkan indikasi kuat pola penipuan digital.';
    let indicators: ThreatIndicator[] = [];
    let recommendations: RecommendedAction[] = [
      {
        id: 'rec_safe_1',
        priority: 'optional',
        actionText: 'Tetap Waspada',
        explanation: 'Pastikan selalu memverifikasi identitas pengirim jika ada permintaan tak biasa di kemudian hari.'
      }
    ];

    // 1. COBA ANALISIS DENGAN GROQ AI LLM (LLaMA-3.1 8B Instant)
    const groqResult = await analyzeMessageWithGroq(messageText);

    if (groqResult) {
      riskLevel = groqResult.riskLevel;
      riskScore = groqResult.riskScore;
      detectedScamType = groqResult.detectedScamType;
      summary = groqResult.summary;
      indicators = groqResult.indicators;
      recommendations = groqResult.recommendations;
    } else {
      // 2. FALLBACK: ATURAN HEURISTIK KATA KUNCI (Jika Groq Offline/Limit)
      const text = messageText.toLowerCase();
      const hasApk = text.includes('.apk') || text.includes('unduh aplikasi') || text.includes('instal');
      const hasReward = text.includes('selamat') && (text.includes('hadiah') || text.includes('rp') || text.includes('menang') || text.includes('subsidi') || text.includes('jutaan') || text.includes('dana'));
      const hasOtp = text.includes('otp') || text.includes('kode') || text.includes('pin') || text.includes('password') || text.includes('rekening') || text.includes('bca') || text.includes('bri') || text.includes('mandiri');
      const hasUrgency = text.includes('segera') || text.includes('sekarang') || text.includes('hangus') || text.includes('menit') || text.includes('darurat') || text.includes('sebelum');
      const hasLink = text.includes('http://') || text.includes('https://') || text.includes('bit.ly') || text.includes('.id/') || text.includes('.club') || text.includes('.xyz') || text.includes('.biz');

      if (hasApk) {
        riskLevel = 'critical';
        riskScore = 98;
        detectedScamType = 'Penipuan Malware APK (Pencurian OTP SMS)';
        summary = 'Pesan ini mendesak pengunduhan file .APK berbahaya. Ini adalah modus pencurian data SMS/OTP perbankan yang sangat berisiko.';
        indicators = [
          {
            id: 'ind_apk',
            category: 'malicious_apk',
            title: 'Permintaan Unduh File APK',
            description: 'Pesan memuat instruksi instalasi file APK di luar sumber resmi Google Play Store.',
            severity: 'critical',
            highlightSnippet: '.APK',
          },
          {
            id: 'ind_urg',
            category: 'urgency_pressure',
            title: 'Tekanan Waktu & Desakan',
            description: 'Pesan memaksa tindakan cepat agar korban tidak sempat melakukan verifikasi.',
            severity: 'high',
          }
        ];
        recommendations = [
          {
            id: 'rec_1',
            priority: 'must_do',
            actionText: 'JANGAN PERNAH INSTAL FILE .APK',
            explanation: 'File ini dapat menyadap kode OTP bank dan menghabiskan saldo rekening Anda secara diam-diam.'
          },
          {
            id: 'rec_2',
            priority: 'must_do',
            actionText: 'Blokir Nomor Pengirim',
            explanation: 'Segera blokir dan laporkan nomor pengirim sebagai penipuan.'
          }
        ];
      } else if (hasOtp) {
        riskLevel = 'critical';
        riskScore = 95;
        detectedScamType = 'Pencurian Kredensial / Kode OTP (Phishing)';
        summary = 'Pesan ini meminta informasi rahasia berupa kode OTP/PIN/Kredensial perbankan dengan menyamar sebagai institusi resmi.';
        indicators = [
          {
            id: 'ind_otp',
            category: 'credential_harvesting',
            title: 'Permintaan Kode OTP / Rahasia',
            description: 'Pihak bank atau institusi resmi TIDAK PERNAH meminta kode OTP melalui pesan chat atau SMS.',
            severity: 'critical',
          },
          {
            id: 'ind_imp',
            category: 'impersonation',
            title: 'Peniruan Identitas Bank (Impersonasi)',
            description: 'Mengatasnamakan layanan keamanan bank untuk memperdaya korban.',
            severity: 'critical',
          }
        ];
        recommendations = [
          {
            id: 'rec_otp_1',
            priority: 'must_do',
            actionText: 'JANGAN BERIKAN KODE OTP KEPADA SIAPAPUN',
            explanation: 'Memberikan kode OTP sama saja dengan menyerahkan kunci brankas akun Anda kepada penipu.'
          },
          {
            id: 'rec_otp_2',
            priority: 'must_do',
            actionText: 'Hubungi Call Center Resmi Bank',
            explanation: 'Verifikasi status akun Anda secara mandiri melalui nomor hotline resmi bank.'
          }
        ];
      } else if (hasReward || (hasLink && hasUrgency)) {
        riskLevel = 'high';
        riskScore = 82;
        detectedScamType = 'Penipuan Phishing Hadiah / Link Palsu';
        summary = 'Pesan ini mengklaim hadiah atau penawaran menarik dengan tautan luar yang berpotensi mengambil data pribadi Anda.';
        indicators = [
          {
            id: 'ind_rew',
            category: 'fake_reward',
            title: 'Iming-iming Hadiah / Uang',
            description: 'Menjanjikan keuntungan instan tanpa dasar transaksi yang dapat dipertanggungjawabkan.',
            severity: 'high',
          },
          {
            id: 'ind_link',
            category: 'suspicious_link',
            title: 'Tautan (URL) Mencurigakan',
            description: 'Menggunakan domain gratisan/palsu di luar situs web resmi.',
            severity: 'high',
          }
        ];
        recommendations = [
          {
            id: 'rec_rew_1',
            priority: 'must_do',
            actionText: 'Jangan Klik Tautan Apapun',
            explanation: 'Tautan tersebut dapat mengarahkan ke situs tiruan untuk mengumpulkan password atau data perbankan.'
          }
        ];
      } else if (hasLink) {
        riskLevel = 'medium';
        riskScore = 55;
        detectedScamType = 'Link Luar Perlu Diwaspadai';
        summary = 'Pesan memuat tautan luar. Berhati-hatilah sebelum memasukkan informasi sensitif pada web tersebut.';
        indicators = [
          {
            id: 'ind_link_med',
            category: 'suspicious_link',
            title: 'Mengandung Tautan Luar',
            description: 'Tautan memerlukan verifikasi domain sebelum diakses.',
            severity: 'medium',
          }
        ];
      }
    }

    // 3. SIMPAN HASIL ANALISIS KE SUPABASE
    let savedId: string | null = null;
    let savedTimestamp: string | null = null;

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      const { data: insertedData, error: dbError } = await supabase
        .from('analysis_history')
        .insert({
          user_id: session?.user?.id || null,
          session_type: 'single_message',
          input_text: messageText,
          risk_level: riskLevel,
          risk_score: riskScore,
          detected_scam_type: detectedScamType,
          summary: summary,
          indicators: indicators,
          recommendations: recommendations,
        })
        .select('id, created_at')
        .single();

      if (dbError) {
        console.warn('Gagal menyimpan ke Supabase (akan menggunakan response temporary):', dbError.message);
      } else if (insertedData) {
        savedId = insertedData.id;
        savedTimestamp = insertedData.created_at;
      }
    } catch (dbErr) {
      console.warn('Supabase DB Exception:', dbErr);
    }

    const responsePayload: SingleAnalysisResponse = {
      id: savedId || `res_single_${Date.now()}`,
      timestamp: savedTimestamp || new Date().toISOString(),
      riskLevel,
      riskScore,
      summary,
      indicators,
      recommendations,
      disclaimer: 'Analisis dihasilkan secara cerdas oleh Tumbasna AI Engine dan tersimpan di database Supabase. Tetap berhati-hati sebelum bertransaksi.',
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('API Single Analysis Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server saat menganalisis pesan.' },
      { status: 500 }
    );
  }
}
