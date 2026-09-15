# AntiScam — Dokumentasi Proyek & Spesifikasi Teknis

Selamat datang di repositori dokumentasi teknis **tumbasna**. Folder `doss/` ini memuat seluruh panduan arsitektur, spesifikasi fungsional, standar desain, kontrak data API, dan kebijakan privasi untuk pengembangan aplikasi web AntiScam.

---

## 📚 Indeks Dokumen Spesifikasi

Berikut adalah peta navigasi seluruh dokumen spesifikasi teknis yang tersedia:

| Dokumen | Nama File | Deskripsi & Cakupan Utama |
| :--- | :--- | :--- |
| **Product Requirements Document** | [`prd.md`](./prd.md) | Dokumen kebutuhan produk utama, visi, target pengguna, use cases, batasan MVP, dan prinsip desain. |
| **WhatsApp Chat Analyzer Spec** | [`whatsapp-chat-analyzer.md`](./whatsapp-chat-analyzer.md) | **Fitur Utama:** Spesifikasi lengkap fitur impor/ekspor chat WhatsApp (.txt), parser regex Android/iOS, visualizer balon chat, seleksi pesan, dan ekspor laporan. |
| **Frontend Architecture** | [`architecture.md`](./architecture.md) | Arsitektur teknis Next.js App Router, pemisahan RSC vs Client Components, arsitektur state Zustand, dan struktur folder. |
| **API Specification & Contracts** | [`api-spec.md`](./api-spec.md) | Kontrak data REST API untuk analisis teks tunggal dan percakapan multi-pesan WA, tipe TypeScript, skema error, dan mock dataset. |
| **Design System & UI Tokens** | [`design-system.md`](./design-system.md) | Token visual (Poppins font, palet warna semantik risiko, skala tipografi responsif, aturan nol-emoji, dan mapping ikon Lucide). |
| **Security & Privacy (PII)** | [`security-privacy.md`](./security-privacy.md) | Kebijakan privasi data (*Privacy by Design*), modul sensor nomor HP/rekening (*Client-Side PII Masking*), dan sanitasi keamanan XSS. |
| **Development Plan & QA Matrix** | [`development-plan.md`](./development-plan.md) | Rencana sprint, checklist pembagian tugas (*task breakdown*), dan matriks pengujian kualitas (kasus uji parser WA, responsivitas, Lighthouse). |

---

## 🌟 Sorotan Fitur Unggulan: Analisis Ekspor Chat WhatsApp

Salah satu kapabilitas kunci yang membedakan AntiScam adalah **WhatsApp Chat Analyzer**:

```text
[ File Ekspor Chat WA (.txt) ] ──► [ Parser Sisi Klien ] ──► [ PII Sensor ] ──► [ Deteksi Modus Penipuan ]
                                                                                      │
                                                                                      ▼
[ Ekspor Laporan PDF / Gambar PNG ] ◄── [ Sorotan Balon Berbahaya & Kronologi ] ◄────┘
```

1. **Dukungan Format Luas**: Mampu mem-parsing ekspor chat dari Android dan iOS (format 12 jam/24 jam, timestamp kurung siku, dan multi-line chat).
2. **Visualizer Balon Chat Interaktif**: Mengubah log teks mentah menjadi tampilan obrolan yang rapi dan nyaman dibaca.
3. **Sensor Privasi Otomatis**: Menyensor nomor telepon dan data rekening secara lokal di memori browser sebelum analisis dikirim ke API.
4. **Analisis Kronologi Eskalasi**: Mendeteksi pola manipulasi psikologis penipu dari fase pendekatan awal (*bait*) hingga pengiriman file berbahaya (*malicious payload* seperti file `.APK`).
5. **Ekspor Laporan Investigasi**: Menghasilkan kartu gambar ringkasan (PNG) dan dokumen laporan keamanan (PDF) yang siap dibagikan.

---

## 🛠️ Ringkasan Standar Teknologi & Konvensi

* **Framework**: Next.js 14+ (App Router)
* **Bahasa**: TypeScript
* **Styling**: Tailwind CSS
* **Font**: Poppins (Google Fonts)
* **Ikon**: Lucide Icons (SVG murni, strictly **zero emoji**)
* **Deployment**: Vercel
* **State Management**: Zustand
* **Prinsip UI**: Clean, Modern, Minimal, Trustworthy, Mobile-First
