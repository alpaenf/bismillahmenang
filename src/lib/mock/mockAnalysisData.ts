import { SingleAnalysisResponse } from '@/types/analysis';
import { WhatsAppAnalysisResponse } from '@/types/whatsapp';

export interface SamplePrompt {
  id: string;
  categoryKey: string;
  label: string;
  categoryName: string;
  type: 'single' | 'whatsapp';
  description: string;
  rawText: string;
}

export const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    id: 'sample_link',
    categoryKey: 'suspicious_link',
    label: 'Tautan Phishing',
    categoryName: 'Tautan Mencurigakan',
    type: 'single',
    description: 'Tautan domain palsu mengatasnamakan pemulihan akun Tokopedia/Bank',
    rawText: `PENTING: Akun Tokopedia Anda dibatasi sementara karena aktivitas tidak wajar dari perangkat asing. Segera verifikasi identitas Anda dalam 1x24 jam untuk membuka blokir melalui tautan resmi: https://tokopedia-verifikasi-keamanan.xyz/id-9921`,
  },
  {
    id: 'sample_apk',
    categoryKey: 'malicious_apk',
    label: 'File APK Malware',
    categoryName: 'File APK Malware',
    type: 'whatsapp',
    description: 'Penyelundupan file APK berkedok resi foto paket kurir ekspedisi',
    rawText: `[20/08/24, 14.30.10] +62 812-9988-7766: Selamat siang kak, kami dari kurir J&T Express. Paket atas nama Anda tertahan karena alamat tidak lengkap.
[20/08/24, 14.31.05] Anda: Halo, paket apa ya? Saya tidak pesan apa-apa.
[20/08/24, 14.32.18] +62 812-9988-7766: Silakan unduh dan cek foto detail paket serta resi pengiriman pada file berikut: LIHAT_FOTO_PAKET.apk
[20/08/24, 14.33.00] +62 812-9988-7766: Tolong segera diinstal aplikasinya agar barang tidak diretur ke gudang pusat hari ini juga.`,
  },
  {
    id: 'sample_urgency',
    categoryKey: 'urgency_pressure',
    label: 'Tekanan Waktu',
    categoryName: 'Tekanan Waktu (Urgency)',
    type: 'single',
    description: 'Manipulasi psikologis dengan ancaman denda dan batas waktu 30 menit',
    rawText: `PERINGATAN TERAKHIR PLN: Tagihan denda keterlambatan listrik Anda sebesar Rp 1.450.000 jatuh tempo dalam 30 MENIT ke depan. Segera selesaikan pembayaran ke Virtual Account 889201928391 sebelum pemutusan aliran listrik dilakukan petugas di lapangan.`,
  },
  {
    id: 'sample_financial',
    categoryKey: 'financial_request',
    label: 'Permintaan Transfer',
    categoryName: 'Permintaan Transfer Uang',
    type: 'whatsapp',
    description: 'Permintaan transfer biaya admin pinjol kilat tanpa syarat',
    rawText: `25/08/24 09.15 - Pinjaman Kilat Express: Halo kak! Butuh dana darurat cair dalam 5 menit? Kami sediakan limit hingga Rp50.000.000 tanpa BI checking dan tanpa jaminan.
25/08/24 09.16 - Anda: Syaratnya apa saja?
25/08/24 09.17 - Pinjaman Kilat Express: Cukup kirim foto KTP dan transfer biaya administrasi pembukaan rekening Rp250.000 ke rekening bendahara kami BCA 8720192837 a.n Rian. Dana langsung cair!`,
  },
  {
    id: 'sample_otp',
    categoryKey: 'credential_harvesting',
    label: 'Pencurian OTP / PIN',
    categoryName: 'Pencurian Kredensial & OTP',
    type: 'single',
    description: 'Impersonasi customer service bank meminta kode OTP transaksi',
    rawText: `PEMBERITAHUAN BCA: Ada upaya transaksi debit mencurigakan sebesar Rp 3.500.000 di akun m-Banking Anda. Untuk membatalkan transaksi ilegal ini, mohon segera balas pesan ini dengan menyebutkan 6 digit kode OTP yang baru saja kami kirimkan melalui SMS.`,
  },
  {
    id: 'sample_reward',
    categoryKey: 'fake_reward',
    label: 'Hadiah / Undian Fiktif',
    categoryName: 'Hadiah & Undian Palsu',
    type: 'single',
    description: 'Pesan memenangkan dana puluhan juta rupiah dari program undian',
    rawText: `Selamat! Nomor WhatsApp Anda terpilih mendapatkan Hadiah Dana Tunai Rp 15.000.000 dari Program Kejutan Berkah 2026. Segera klaim saldo Anda sebelum hangus malam ini melalui link resmi: https://klaim-dana-kejutan-resmi.biz.id/id-9823`,
  },
  {
    id: 'sample_impersonation',
    categoryKey: 'impersonation',
    label: 'Impersonasi Teman / Pejabat',
    categoryName: 'Impersonasi Institusi / Teman',
    type: 'single',
    description: 'Pelaku mengaku sebagai teman ganti nomor dan meminjam uang darurat',
    rawText: `Halo bro, ini nomor baru gue Andi. HP lama gue hilang kecopetan kemarin. Boleh minta tolong transferin dulu 1 juta ke temen gue? M-banking gue belum bisa login di HP baru ini, besok pagi langsung gue ganti pas ketemu di kantor.`,
  },
  {
    id: 'sample_language',
    categoryKey: 'suspicious_language',
    label: 'Bahasa Janggal',
    categoryName: 'Tata Bahasa Janggal',
    type: 'single',
    description: 'Pesan terjemahan mesin otomatis dari sindikat penipuan luar negeri',
    rawText: `Halo terhormat pelanggan yang baik. Kami melihat akun Anda memiliki keberuntungan luar biasa menerima kompensasi dana dari yayasan amal global sebesar 5000 USD. Silakan Anda membalas ya dan memberikan nomor kartu Anda untuk menerima mata uang langsung sekarang.`,
  },
  {
    id: 'sample_normal',
    categoryKey: 'normal_message',
    label: 'Pesan Normal (Aman)',
    categoryName: 'Pesan Normal Resmi',
    type: 'single',
    description: 'Notifikasi resi pesanan e-commerce resmi tanpa unsur manipulasi',
    rawText: `Halo Budi, pesanan nomor INV/20260831/XX/12345 di Tokopedia telah diserahkan ke kurir SiCepat dengan nomor resi 002938475612. Anda dapat memantau status pengiriman langsung di aplikasi Tokopedia. Terima kasih telah berbelanja!`,
  },
];

export const MOCK_SINGLE_HIGH_RISK: SingleAnalysisResponse = {
  id: 'res_single_high_01',
  timestamp: new Date().toISOString(),
  riskLevel: 'critical',
  riskScore: 92,
  summary: 'Pesan ini memiliki indikasi kuat penipuan phishing berkedok pembagian hadiah dana tunai dengan domain tautan mencurigakan.',
  indicators: [
    {
      id: 'ind_1',
      category: 'fake_reward',
      title: 'Hadiah Palsu / Imbalan Fiktif',
      description: 'Menjanjikan hadiah uang dalam jumlah besar tanpa keikutsertaan kompetisi yang valid.',
      severity: 'critical',
      highlightSnippet: 'Hadiah Dana Tunai Rp 15.000.000',
    },
    {
      id: 'ind_2',
      category: 'suspicious_link',
      title: 'Tautan Domain Tidak Resmi',
      description: 'Penggunaan ekstensi domain tidak terpercaya (.biz.id) yang sering digunakan situs phising peniru institusi resmi.',
      severity: 'critical',
      highlightSnippet: 'https://klaim-dana-kejutan-resmi.biz.id/id-9823',
    },
    {
      id: 'ind_3',
      category: 'urgency_pressure',
      title: 'Tekanan Waktu (Urgensi Palsu)',
      description: 'Menciptakan rasa terburu-buru dengan klausul "sebelum hangus malam ini" agar korban tidak sempat berpikir jernih.',
      severity: 'medium',
      highlightSnippet: 'sebelum hangus malam ini',
    },
  ],
  recommendations: [
    {
      id: 'rec_1',
      priority: 'must_do',
      actionText: 'JANGAN KLIK TAUTAN TERSEBUT',
      explanation: 'Tautan berbahaya berpotensi mencuri data pribadi, akun perbankan, atau memicu unduhan malware.',
    },
    {
      id: 'rec_2',
      priority: 'must_do',
      actionText: 'Blokir Nomor Kontak Pengirim',
      explanation: 'Laporkan nomor pengirim sebagai Spam di aplikasi perpesanan Anda agar tidak menerima pesan serupa.',
    },
    {
      id: 'rec_3',
      priority: 'should_do',
      actionText: 'Jangan Berikan Informasi Apapun',
      explanation: 'Pihak resmi tidak pernah meminta data pribadi atau transfer uang untuk pencairan hadiah.',
    },
  ],
  disclaimer: 'Hasil analisis dihasilkan secara otomatis oleh sistem deteksi pola Tumbasna dan bukan jaminan hukum mutlak. Selalu verifikasi langsung ke pihak resmi.',
};

export const MOCK_SINGLE_LOW_RISK: SingleAnalysisResponse = {
  id: 'res_single_low_01',
  timestamp: new Date().toISOString(),
  riskLevel: 'low',
  riskScore: 12,
  summary: 'Pesan ini terindikasi aman sebagai notifikasi pengiriman pesanan standar dari platform e-commerce terpercaya.',
  indicators: [],
  recommendations: [
    {
      id: 'rec_low_1',
      priority: 'optional',
      actionText: 'Pantau di Aplikasi Resmi',
      explanation: 'Selalu gunakan aplikasi resmi penyedia layanan untuk melacak status pesanan Anda.',
    },
  ],
  disclaimer: 'Hasil analisis dihasilkan secara otomatis oleh sistem deteksi pola Tumbasna.',
};

export const MOCK_WHATSAPP_APK_SCAM: WhatsAppAnalysisResponse = {
  id: 'res_wa_apk_01',
  timestamp: new Date().toISOString(),
  overallRiskLevel: 'critical',
  overallRiskScore: 96,
  detectedScamType: 'APK Malware Kurir Paket Palsu',
  summary:
    'Percakapan WhatsApp ini menunjukkan eskalasi modus kurir paket palsu yang berusaha menyelundupkan file APK malware untuk membajak SMS/OTP korban.',
  escalationFlow: [
    {
      phaseNumber: 1,
      phaseName: 'Pendekatan (Approach)',
      description: 'Pelaku menyapa sopan dan mengklaim paket tertahan karena alamat tidak lengkap.',
    },
    {
      phaseNumber: 2,
      phaseName: 'Pengiriman Payload (Delivery)',
      description: 'Pelaku mengirimkan file .APK dan menyebutnya sebagai "foto detail paket".',
    },
    {
      phaseNumber: 3,
      phaseName: 'Tekanan Eksekusi (Pressure)',
      description: 'Pelaku mendesak korban untuk segera menginstal file dengan ancaman retur hari ini.',
    },
  ],
  flaggedMessages: [
    {
      messageId: 'msg_3',
      riskLevel: 'critical',
      triggerCategory: 'malicious_apk',
      reason: 'Penyelundupan file instalasi Android (.apk).',
    },
  ],
  indicators: [
    {
      id: 'ind_wa_1',
      category: 'malicious_apk',
      title: 'Penyelundupan File Android .APK',
      description:
        'Pengirim mengirimkan file dengan ekstensi executable .apk dan membujuk korban untuk menginstalnya dengan klaim sebagai foto paket.',
      severity: 'critical',
      highlightSnippet: 'LIHAT_FOTO_PAKET.apk',
    },
    {
      id: 'ind_wa_2',
      category: 'impersonation',
      title: 'Impersonasi Kurir J&T Express',
      description: 'Mengaku sebagai kurir resmi ekspedisi ternama untuk membangun rasa percaya semu korban.',
      severity: 'high',
      highlightSnippet: 'pihak ekspedisi J&T',
    },
    {
      id: 'ind_wa_3',
      category: 'urgency_pressure',
      title: 'Ancaman Retur Barang Mendesak',
      description: 'Menciptakan tekanan bahwa barang akan diretur hari ini jika tidak segera menginstal aplikasi tersebut.',
      severity: 'high',
      highlightSnippet: 'agar barang tidak diretur ke gudang pusat hari ini',
    },
  ],
  recommendations: [
    {
      id: 'rec_wa_1',
      priority: 'must_do',
      actionText: 'JANGAN KLIK ATAU BUKA FILE .APK',
      explanation: 'File tersebut adalah Trojan SMS stealer yang dapat mencuri seluruh kode OTP perbankan Anda.',
    },
    {
      id: 'rec_wa_2',
      priority: 'must_do',
      actionText: 'Blokir & Laporkan Kontak WhatsApp',
      explanation: 'Gunakan fitur "Block & Report" bawaan WhatsApp agar nomor pelaku dibekukan.',
    },
    {
      id: 'rec_wa_3',
      priority: 'should_do',
      actionText: 'Verifikasi Melalui Aplikasi Resmi Ekspedisi',
      explanation: 'Cek nomor resi asli hanya melalui website atau aplikasi resmi J&T Express.',
    },
  ],
  disclaimer: 'Analisis percakapan WhatsApp diproses di memori lokal. Tumbasna tidak menyimpan isi pesan chat Anda.',
};
