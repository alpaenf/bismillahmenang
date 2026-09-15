import React from 'react';
import type { Metadata } from 'next';
import { AlertCircle, ShieldAlert, FileText, Ban } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan Layanan | Tumbasna',
  description:
    'Syarat penggunaan layanan Tumbasna, batasan tanggung jawab, serta disclaimer evaluasi risiko otomatis.',
};

export default function TermsPage() {
  const prohibitions = [
    'Melakukan serangan Denial of Service (DoS) atau tindakan yang membebani infrastruktur API secara tidak wajar.',
    'Menyalahgunakan output analisis untuk menuduh, mencemarkan nama baik, atau merugikan pihak lain secara melawan hukum.',
    'Mencoba mengekstrak, mendekripsi, atau menyalahgunakan data sensitif milik orang lain tanpa hak dan izin yang sah.',
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Legalitas & Tata Tertib
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Terakhir diperbarui: 31 Agustus 2026
            </p>
          </div>
        </ScrollReveal>

        {/* Black Disclaimer Callout */}
        <ScrollReveal direction="up" delay={100}>
          <div className="p-5 sm:p-6 rounded-3xl bg-foreground text-white border border-foreground space-y-2.5 shadow-md">
            <div className="flex items-start sm:items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <h2 className="font-bold text-sm sm:text-base text-white leading-snug">
                Penting: Disclaimer Evaluasi Risiko Otomatis
              </h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-300">
              Tumbasna adalah alat bantu edukasi berbasis deteksi pola. Hasil analisis skor risiko, indikator, dan rekomendasi bukan merupakan nasihat hukum, audit forensik resmi, atau jaminan mutlak bahwa sebuah pesan 100% aman atau 100% scam. Selalu gunakan pertimbangan akal sehat dan verifikasi mandiri ke kontak resmi institusi terkait.
            </p>
          </div>
        </ScrollReveal>

        {/* Terms Sections */}
        <div className="space-y-6 sm:space-y-8 text-foreground-secondary leading-relaxed text-sm sm:text-base">
          <ScrollReveal direction="up" delay={150}>
            <section className="bg-white border border-border rounded-3xl p-5 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-base sm:text-xl font-bold text-foreground">
                1. Penerimaan Ketentuan
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed">
                Dengan mengakses dan menggunakan website Tumbasna, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <section className="bg-white border border-border rounded-3xl p-5 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-base sm:text-xl font-bold text-foreground">
                2. Penggunaan yang Diizinkan
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed">
                Layanan Tumbasna disediakan secara gratis untuk keperluan pribadi dalam memverifikasi pesan mencurigakan. Anda dilarang keras memanfaatkan layanan ini untuk:
              </p>

              {/* Structured Prohibition List */}
              <div className="space-y-2.5 pt-1">
                {prohibitions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-background-subtle border border-border/80 flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm leading-relaxed text-foreground-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <section className="bg-white border border-border rounded-3xl p-5 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-base sm:text-xl font-bold text-foreground">
                3. Batasan Tanggung Jawab
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed">
                Pengembang Tumbasna tidak bertanggung jawab atas kerugian materiil, finansial, atau non-materiil yang timbul akibat tindakan pengguna setelah membaca hasil analisis pada website ini. Keputusan untuk mengklik tautan, mentransfer uang, atau mengabaikan pesan sepenuhnya berada di bawah tanggung jawab pengguna secara mandiri.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <section className="bg-white border border-border rounded-3xl p-5 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-base sm:text-xl font-bold text-foreground">
                4. Ketersediaan Layanan
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed">
                Kami berusaha menjaga agar layanan selalu dapat diakses 24/7, namun kami tidak menjamin layanan akan selalu bebas dari gangguan teknis, pemeliharaan berkala, atau kegagalan koneksi pihak ketiga.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
