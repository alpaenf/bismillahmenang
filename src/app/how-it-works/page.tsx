import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  FileWarning,
  ExternalLink,
  Lock,
  Clock,
  CreditCard,
  Gift,
  UserX,
  FileText,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DetectionCategories } from '@/components/landing/DetectionCategories';

export const metadata: Metadata = {
  title: 'Cara Kerja Tumbasna & Metode Verifikasi Pesan | Tumbasna',
  description:
    'Pelajari bagaimana Tumbasna memproses pesan tunggal dan riwayat chat WhatsApp, mendeteksi pola penipuan, dan mengevaluasi tingkat risiko transaksi online.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Pilih Metode Input: Pesan Tunggal atau Chat WA',
      desc: 'AntiScam mendukung dua opsi input sesuai format pesan yang Anda terima:',
      items: [
        {
          title: 'Pesan Tunggal',
          desc: 'Salin (copy-paste) teks SMS, DM media sosial, atau sebaris pesan WhatsApp yang mencurigakan.',
        },
        {
          title: 'Ekspor Chat WhatsApp',
          desc: 'Unggah file .txt riwayat percakapan untuk menganalisis alur interaksi multi-pesan secara utuh.',
        },
      ],
      detail: 'Seluruh data diproses secara lokal di memori browser Anda dengan sensor nomor telepon & data pribadi otomatis (Privacy by Design).',
    },
    {
      num: '02',
      title: 'Pemindaian Pola Rekayasa Sosial (Pattern Matching)',
      desc: 'Mesin deteksi membedah konten teks terhadap 8 kategori indikator ancaman kejahatan digital:',
      items: [
        {
          title: 'Domain Phishing',
          desc: 'Memeriksa URL mencurigakan, domain palsu (.xyz, .biz.id), dan tautan peniru portal bank.',
        },
        {
          title: 'Malware Android (.APK)',
          desc: 'Mendeteksi berkas instalasi berbahaya berkedok foto paket kurir, surat tilang, atau undangan.',
        },
        {
          title: 'Pencurian OTP & Kredensial',
          desc: 'Mengenali upaya penipuan yang meminta kode OTP, PIN m-Banking, atau nomor CVV kartu.',
        },
        {
          title: 'Tekanan Waktu Psikologis',
          desc: 'Mengidentifikasi desakan waktu artifisial ("sebelum hangus", "dalam 30 menit") agar korban panik.',
        },
        {
          title: 'Permintaan Transfer Dana',
          desc: 'Mengendus instruksi biaya administrasi di muka, uang jaminan pinjol, atau tebusan hadiah.',
        },
        {
          title: 'Impersonasi Institusi',
          desc: 'Mendeteksi penyamaran sebagai kurir ekspedisi, customer service resmi, atau kerabat dekat.',
        },
      ],
    },
    {
      num: '03',
      title: 'Kalkulasi Skor Risiko Terukur (0 - 100)',
      desc: 'Setiap indikator ancaman yang terdeteksi memiliki bobot risiko tersendiri. Sistem menghitung skor komposit dan mengklasifikasikannya ke dalam 4 standar tingkat keparahan (Low, Medium, High, Critical).',
    },
    {
      num: '04',
      title: 'Panduan Mitigasi & Langkah Tindakan Aman',
      desc: 'Pengguna tidak hanya diberitahu tingkat bahaya, tetapi langsung mendapatkan panduan langkah konkret: blokir kontak, amankan akun m-banking, abaikan pesan, atau lakukan verifikasi langsung ke kontak resmi instansi.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center space-y-4">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Panduan & Metodologi Pemeriksaan
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Bagaimana AntiScam Bekerja?
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              AntiScam mengombinasikan analisis pesan tunggal dan evaluasi percakapan WhatsApp untuk mengurai modus penipuan digital secara transparan.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Main Analysis Modes Comparison Card */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white border-2 border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                2 Pilihan Mode Pemeriksaan
              </h2>
              <p className="text-xs sm:text-sm text-foreground-secondary">
                Pilih metode analisis yang paling sesuai dengan jenis pesan yang Anda terima.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Mode 1: Single Message */}
              <div className="p-6 rounded-2xl bg-background-subtle border border-border space-y-4 flex flex-col justify-between hover:border-foreground hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-foreground shadow-xs">
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      1. Pemeriksaan Pesan Tunggal (Single Text)
                    </h3>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Cocok untuk SMS hadiah, pesan promo, DM media sosial, atau pesan singkat WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Deteksi Link Phishing:</strong>{' '}
                        <span className="text-foreground-secondary">Memeriksa tautan palsu perbankan, e-commerce, atau domain tiruan.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Deteksi Minta OTP / PIN:</strong>{' '}
                        <span className="text-foreground-secondary">Mengenali bujuk rayu penyerahan kata sandi & kode SMS rahasia.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Deteksi Ancaman Waktu:</strong>{' '}
                        <span className="text-foreground-secondary">Mengendus klausul batas waktu mendesak (urgensi palsu).</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/analyze?mode=single">
                    <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                      <span>Coba Periksa Pesan Teks</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mode 2: WhatsApp Chat Export */}
              <div className="p-6 rounded-2xl bg-background-subtle border border-border space-y-4 flex flex-col justify-between hover:border-foreground hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shadow-xs">
                    <WhatsAppIcon colored size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      2. Ekspor Chat WhatsApp (Multi-Bubble)
                    </h3>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Cocok untuk percakapan panjang dengan kurir paket palsu, penawar pinjol, atau rekanan bisnis.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Sensor Privasi (PII):</strong>{' '}
                        <span className="text-foreground-secondary">Nomor HP dan identitas pribadi otomatis disensor langsung di browser.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Deteksi File .APK:</strong>{' '}
                        <span className="text-foreground-secondary">Menandai berkas malware berbahaya yang dikirim dalam obrolan.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-border/80 flex items-start gap-2.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-foreground font-bold">Garis Waktu Eskalasi:</strong>{' '}
                        <span className="text-foreground-secondary">Mengurai tahapan manipulasi psikologis dari sapaan hingga penjeratan.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/analyze">
                    <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                      <span>Coba Ekspor Chat WA</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Steps Detailed */}
        <div className="space-y-8">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Tahapan Analisis Sistem AntiScam
            </h2>
            <p className="text-xs sm:text-sm text-foreground-secondary">
              Bagaimana data diproses secara terstruktur mulai dari input hingga laporan rekomendasi.
            </p>
          </div>

          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="up" distance={25}>
              <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-5">
                {/* Step Header */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-foreground text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {s.num}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">{s.title}</h3>
                </div>

                <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed pl-0 sm:pl-[52px]">
                  {s.desc}
                </p>

                {/* Structured Mini Cards */}
                {s.items && (
                  <div className="ml-0 sm:ml-[52px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-background-subtle border border-border/80 flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                        <div className="text-xs leading-relaxed">
                          <strong className="text-foreground font-bold block mb-0.5">
                            {item.title}
                          </strong>
                          <span className="text-foreground-secondary">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Detail Box */}
                {s.detail && (
                  <div className="ml-0 sm:ml-[52px] p-3.5 bg-background-subtle border border-border rounded-2xl text-xs text-foreground-secondary flex items-start gap-2.5">
                    <EyeOff className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{s.detail}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Risk Level Explanation Card */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-background-subtle border-2 border-border rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-foreground">
              Standar Tingkat Risiko AntiScam
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-risk-low-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="low" size="sm">LOW (0 - 30)</Badge>
                </div>
                <p className="text-xs text-foreground-secondary">
                  Tidak ditemukan pola penipuan signifikan. Pesan menyerupai komunikasi atau notifikasi resmi standar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-risk-medium-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="medium" size="sm">MEDIUM (31 - 60)</Badge>
                </div>
                <p className="text-xs text-foreground-secondary">
                  Terdapat pola yang perlu diwaspadai, seperti domain baru asing atau promosi agresif tanpa izin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-risk-high-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="high" size="sm">HIGH (61 - 85)</Badge>
                </div>
                <p className="text-xs text-foreground-secondary">
                  Terdapat indikator kuat penipuan digital (klaim hadiah fiktif, biaya pinjol di awal, atau ancaman denda palsu).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-risk-critical-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="critical" size="sm">CRITICAL (86 - 100)</Badge>
                </div>
                <p className="text-xs text-foreground-secondary">
                  Ancaman berbahaya langsung: pengiriman file APK malware, permintaan OTP/PIN bank, atau pembobolan akun.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Categories Component */}
        <DetectionCategories />

        {/* CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center p-8 sm:p-12 bg-foreground text-white rounded-3xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Siap Menguji Pesan Anda?</h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Gunakan mesin pemeriksa AntiScam untuk memeriksa pesan teks mencurigakan atau riwayat chat WhatsApp secara instan.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/analyze">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <span>Periksa Pesan Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
