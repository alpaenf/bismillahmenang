import React from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  FileWarning,
  Clock,
  CreditCard,
  Lock,
  Gift,
  UserX,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function DetectionCategories() {
  const categories = [
    {
      key: 'suspicious_link',
      title: 'Tautan Mencurigakan (Phishing Link)',
      desc: 'Mendeteksi domain palsu yang meniru bank, e-commerce, atau instansi resmi.',
      icon: ExternalLink,
    },
    {
      key: 'malicious_apk',
      title: 'File Malware Android (.APK)',
      desc: 'Penyelundupan file instalasi berkedok foto paket kurir, undangan pernikahan, atau surat tilang.',
      icon: FileWarning,
    },
    {
      key: 'urgency_pressure',
      title: 'Tekanan Waktu (Urgency Pressure)',
      desc: 'Manipulasi psikologis dengan batas waktu mendesak agar korban panik dan tergesa-gesa.',
      icon: Clock,
    },
    {
      key: 'financial_request',
      title: 'Permintaan Transfer Uang',
      desc: 'Instruksi transfer dana muka, biaya admin pinjol ilegal, atau tebusan hadiah palsu.',
      icon: CreditCard,
    },
    {
      key: 'credential_harvesting',
      title: 'Pencurian Kredensial & OTP',
      desc: 'Permintaan kode OTP SMS, nomor CVV kartu, PIN, atau kata sandi perbankan.',
      icon: Lock,
    },
    {
      key: 'fake_reward',
      title: 'Hadiah / Undian Fiktif',
      desc: 'Iming-iming saldo jutaan rupiah, subsidi pemerintah palsu, atau mobil mewah gratis.',
      icon: Gift,
    },
    {
      key: 'impersonation',
      title: 'Impersonasi Institusi Resmi',
      desc: 'Pelaku menyamar sebagai customer service bank, kurir ekspedisi, atau aparat penegak hukum.',
      icon: UserX,
    },
    {
      key: 'suspicious_language',
      title: 'Bahasa & Tata Kalimat Janggal',
      desc: 'Pesan terjemahan mesin dengan tanda baca tidak wajar dan pola rayuan khas scammer.',
      icon: FileText,
    },
  ];

  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Cakupan Deteksi Ancaman
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Kategori Penipuan yang Mampu Dikenali
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              Pilih salah satu kategori di bawah untuk langsung menguji contoh kasus nyatanya pada mesin pemeriksa Tumbasna.
            </p>
          </div>
        </ScrollReveal>

        {/* Wide Horizontal 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((c, i) => {
            const IconComponent = c.icon;
            return (
              <ScrollReveal key={c.key} delay={(i % 2) * 80} direction="up" distance={20}>
                <Link href={`/analyze?category=${c.key}`} className="block h-full group">
                  <Card className="p-5 sm:p-6 rounded-3xl border border-border group-hover:border-foreground group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between cursor-pointer bg-white">
                    <div className="flex items-start gap-4">
                      {/* Left Icon Badge */}
                      <div className="w-12 h-12 rounded-2xl bg-background-subtle border border-border flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-foreground group-hover:border-foreground transition-all duration-300">
                        <IconComponent
                          className="w-5 h-5 text-foreground group-hover:text-white group-active:text-white transition-colors duration-300"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Content Info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-foreground">
                          {c.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-foreground">
                      <span className="text-foreground-secondary group-hover:text-foreground transition-colors">
                        Simulasi Kasus Nyata
                      </span>
                      <span className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        <span>Uji Kategori Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
