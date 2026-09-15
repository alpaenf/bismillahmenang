import { SingleAnalysisRequest, SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisRequest, WhatsAppAnalysisResponse } from '@/types/whatsapp';
import { MOCK_SINGLE_HIGH_RISK, MOCK_SINGLE_LOW_RISK, MOCK_WHATSAPP_APK_SCAM } from './mockAnalysisData';

export async function simulateSingleMessageAnalysis(
  req: SingleAnalysisRequest
): Promise<SingleAnalysisResponse> {
  // Simulate network latency (1.2s)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const text = req.messageText.toLowerCase();

  // Check for scam signals in text
  const hasApk = text.includes('.apk') || text.includes('unduh aplikasi') || text.includes('instal');
  const hasReward = text.includes('selamat') && (text.includes('hadiah') || text.includes('rp') || text.includes('menang') || text.includes('subsidi') || text.includes('jutaan') || text.includes('dana'));
  const hasOtp = text.includes('otp') || text.includes('kode') || text.includes('pin') || text.includes('password') || text.includes('rekening') || text.includes('bca') || text.includes('bri') || text.includes('mandiri');
  const hasUrgency = text.includes('segera') || text.includes('sekarang') || text.includes('hangus') || text.includes('menit') || text.includes('darurat') || text.includes('sebelum');
  const hasLink = text.includes('http://') || text.includes('https://') || text.includes('bit.ly') || text.includes('.id/') || text.includes('.club') || text.includes('.xyz') || text.includes('.biz');

  if (hasApk) {
    return {
      id: `res_single_${Date.now()}`,
      timestamp: new Date().toISOString(),
      riskLevel: 'critical',
      riskScore: 98,
      summary: 'Pesan ini mendesak pengunduhan file .APK berbahaya. Ini adalah modus pencurian data SMS/OTP perbankan yang sangat berisiko.',
      indicators: [
        {
          id: 'ind_apk',
          category: 'malicious_apk',
          title: 'Permintaan Unduh File APK',
          description: 'Pesan memuat instruksi instalasi file APK di luar sumber resmi Google Play Store.',
          severity: 'critical',
          highlightSnippet: 'File .APK terdeteksi',
        },
        {
          id: 'ind_urg',
          category: 'urgency_pressure',
          title: 'Tekanan Waktu',
          description: 'Pesan memaksa tindakan cepat agar korban tidak sempat melakukan verifikasi.',
          severity: 'high',
        },
      ],
      recommendations: [
        {
          id: 'rec_1',
          priority: 'must_do',
          actionText: 'JANGAN PERNAH INSTAL FILE .APK',
          explanation: 'File ini dapat menyadap kode OTP bank dan menghabiskan saldo rekening Anda secara diam-diam.',
        },
        {
          id: 'rec_2',
          priority: 'must_do',
          actionText: 'Blokir Nomor Pengirim',
          explanation: 'Segera blokir dan laporkan nomor pengirim sebagai penipuan.',
        },
      ],
      disclaimer: 'Analisis dihasilkan secara otomatis oleh sistem deteksi pola AntiScam. Tetap waspada terhadap pengiriman file dari nomor tidak dikenal.',
    };
  }

  if (hasOtp) {
    return {
      id: `res_single_${Date.now()}`,
      timestamp: new Date().toISOString(),
      riskLevel: 'critical',
      riskScore: 95,
      summary: 'Pesan ini meminta informasi rahasia berupa kode OTP/PIN/Kredensial perbankan dengan menyamar sebagai institusi resmi.',
      indicators: [
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
        },
      ],
      recommendations: [
        {
          id: 'rec_otp_1',
          priority: 'must_do',
          actionText: 'JANGAN BERIKAN KODE OTP KEPADA SIAPAPUN',
          explanation: 'Memberikan kode OTP sama saja dengan menyerahkan kunci brankas akun Anda kepada penipu.',
        },
        {
          id: 'rec_otp_2',
          priority: 'must_do',
          actionText: 'Hubungi Call Center Resmi Bank',
          explanation: 'Verifikasi status akun Anda secara mandiri melalui nomor hotline resmi bank.',
        },
      ],
      disclaimer: 'Analisis dihasilkan secara otomatis. Jagalah selalu kerahasiaan kode OTP dan kata sandi Anda.',
    };
  }

  if (hasReward || (hasLink && hasUrgency)) {
    return {
      ...MOCK_SINGLE_HIGH_RISK,
      id: `res_single_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }

  if (hasLink || hasUrgency) {
    return {
      id: `res_single_${Date.now()}`,
      timestamp: new Date().toISOString(),
      riskLevel: 'medium',
      riskScore: 54,
      summary: 'Pesan memuat tautan atau ajakan bertindak yang perlu diwaspadai. Pastikan memeriksa keaslian alamat domain sebelum mengkliknya.',
      indicators: [
        {
          id: 'ind_med_1',
          category: 'suspicious_link',
          title: 'Tautan Luar Terdeteksi',
          description: 'Pesan mengandung link eksternal. Periksa ejaan domain dengan seksama.',
          severity: 'medium',
        },
      ],
      recommendations: [
        {
          id: 'rec_med_1',
          priority: 'should_do',
          actionText: 'Jangan Sembarangan Mengisi Formulir Data Diri',
          explanation: 'Pastikan website yang Anda kunjungi menggunakan sertifikat SSL dan domain resmi yang terverifikasi.',
        },
      ],
      disclaimer: 'Analisis dihasilkan secara otomatis. Lakukan verifikasi manual sebelum melanjutkan interaksi.',
    };
  }

  // Fallback: Low Risk / Normal message
  return {
    ...MOCK_SINGLE_LOW_RISK,
    id: `res_single_${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
}

export async function simulateWhatsAppChatAnalysis(
  req: WhatsAppAnalysisRequest
): Promise<WhatsAppAnalysisResponse> {
  // Simulate network latency (1.5s)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const allText = req.messages.map((m) => m.content).join(' ').toLowerCase();

  const hasApk = allText.includes('.apk') || allText.includes('paket') || allText.includes('resi') || allText.includes('kurir') || allText.includes('unduh') || allText.includes('instal');
  const hasPinjol = allText.includes('pinjaman') || allText.includes('cair') || allText.includes('bi checking') || allText.includes('administrasi');

  if (hasPinjol) {
    return {
      id: `res_wa_${Date.now()}`,
      timestamp: new Date().toISOString(),
      overallRiskLevel: 'high',
      overallRiskScore: 84,
      detectedScamType: 'Penipuan Pinjaman Online Ilegal (Uang Muka Fiktif)',
      summary: 'Percakapan ini mengindikasikan tawaran pinjol ilegal yang meminta biaya administrasi di awal sebelum pencairan dana palsu.',
      escalationFlow: [
        {
          phaseNumber: 1,
          phaseName: 'Tahap 1: Tawaran Manis (Baiting)',
          description: 'Pelaku menawarkan limit puluhan juta tanpa jaminan dan tanpa BI checking.',
        },
        {
          phaseNumber: 2,
          phaseName: 'Tahap 2: Pengumpulan Data Pribadi (Phishing)',
          description: 'Meminta foto KTP dan selfie korban.',
        },
        {
          phaseNumber: 3,
          phaseName: 'Tahap 3: Pemerasan Biaya Admin (Advance Fee Fraud)',
          description: 'Meminta transfer uang muka sebagai syarat pembukaan rekening fiktif.',
        },
      ],
      flaggedMessages: req.messages
        .filter((m) => !m.isOutgoing && (m.content.includes('KTP') || m.content.includes('administrasi') || m.content.includes('Rp')))
        .map((m) => ({
          messageId: m.id,
          riskLevel: 'high',
          triggerCategory: 'financial_request',
          reason: 'Permintaan transfer dana di awal dan dokumen KTP pribadi.',
        })),
      indicators: [
        {
          id: 'ind_pinjol_1',
          category: 'financial_request',
          title: 'Permintaan Uang Muka / Admin Fee',
          description: 'Pinjaman legal yang terdaftar di OJK tidak pernah meminta biaya transfer di muka ke rekening pribadi.',
          severity: 'high',
        },
        {
          id: 'ind_pinjol_2',
          category: 'credential_harvesting',
          title: 'Pengumpulan Data KTP Ilegal',
          description: 'Data KTP dan selfie rawan disalahgunakan untuk pinjaman lain tanpa sepengetahuan Anda.',
          severity: 'high',
        },
      ],
      recommendations: [
        {
          id: 'rec_pinjol_1',
          priority: 'must_do',
          actionText: 'JANGAN TRANSFER BIAYA APAPUN',
          explanation: 'Ini adalah modus penipuan uang muka fiktif. Uang yang ditransfer tidak akan pernah kembali.',
        },
        {
          id: 'rec_pinjol_2',
          priority: 'must_do',
          actionText: 'Periksa Legalitas Penyelenggara di OJK',
          explanation: 'Hubungi kontak OJK 157 untuk memastikan apakah penyelenggara terdaftar resmi.',
        },
      ],
      disclaimer: 'Analisis percakapan diproses secara lokal di browser Anda. Selalu verifikasi legalitas lembaga keuangan di OJK.',
    };
  }

  if (hasApk) {
    return {
      ...MOCK_WHATSAPP_APK_SCAM,
      id: `res_wa_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }

  // Default: Percakapan Normal / Aman
  return {
    id: `res_wa_${Date.now()}`,
    timestamp: new Date().toISOString(),
    overallRiskLevel: 'low',
    overallRiskScore: 10,
    detectedScamType: 'Percakapan Normal / Aman',
    summary: 'Percakapan ini adalah obrolan biasa yang aman dan tidak menunjukkan tanda-tanda penipuan digital.',
    escalationFlow: [
      {
        phaseNumber: 1,
        phaseName: 'Komunikasi Wajar',
        description: 'Pertukaran pesan sehari-hari yang normal tanpa eskalasi ancaman.',
      },
    ],
    flaggedMessages: [],
    indicators: [],
    recommendations: [
      {
        id: 'rec_safe',
        priority: 'optional',
        actionText: 'Percakapan Wajar',
        explanation: 'Tidak ditemukan indikasi penipuan pada obrolan ini.',
      },
    ],
    disclaimer: 'Analisis dihasilkan secara otomatis oleh sistem deteksi Tumbasna.',
  };
}
