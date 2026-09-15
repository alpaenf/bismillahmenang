import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Tentang Tumbasna & Misi Perlindungan Transaksi Digital',
  description:
    'Misi Tumbasna adalah membuat proses verifikasi pesan mencurigakan, chat WhatsApp, dan transaksi jual-beli online menjadi mudah, cepat, dan aman bagi masyarakat Indonesia.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center space-y-4">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Mengenal Lebih Dekat
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Tentang Tumbasna
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              Cek Dulu Sebelum Tumbas & Transfer. Menghadirkan alat bantu keamanan digital dan verifikasi transaksi online agar setiap orang tahu sebelum mempercayai.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Section */}
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-foreground-secondary leading-relaxed hover:shadow-md transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Mengapa Kami Membangun Tumbasna?
            </h2>
            <p>
              Kata <strong>&ldquo;Tumbas&rdquo;</strong> dalam bahasa lokal berarti <strong>&ldquo;Beli&rdquo;</strong>. Di era serba digital, transaksi jual-beli dan interaksi pesan instan semakin rawan disusupi oleh penipu ulung. Mulai dari olshop fiktif di media sosial, modus kurir paket pengirim file APK penyadap rekening, hingga tautan phishing berkedok promo hadiah.
            </p>
            <p>
              Banyak orang menjadi korban bukan karena ceroboh, melainkan karena tidak memiliki sarana mudah dan cepat untuk memverifikasi apakah sebuah pesan, bukti transfer, atau percakapan WhatsApp memiliki indikasi manipulasi psikologis (*social engineering*).
            </p>
            <p>
              Tumbasna hadir untuk menjawab 3 pertanyaan esensial sebelum Anda mengambil tindakan atau mentransfer uang:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-background-subtle border border-border hover:border-gray-400 transition-colors">
                <span className="font-bold text-foreground block mb-1">1. Seberapa Berisiko?</span>
                <span className="text-xs">Skor probabilitas risiko pesan yang jelas dan terukur (0 - 100).</span>
              </div>
              <div className="p-4 rounded-2xl bg-background-subtle border border-border hover:border-gray-400 transition-colors">
                <span className="font-bold text-foreground block mb-1">2. Mengapa Berisiko?</span>
                <span className="text-xs">Indikator ancaman diuraikan dengan bahasa sederhana dan manusiawi.</span>
              </div>
              <div className="p-4 rounded-2xl bg-background-subtle border border-border hover:border-gray-400 transition-colors">
                <span className="font-bold text-foreground block mb-1">3. Apa yang Harus Dilakukan?</span>
                <span className="text-xs">Rekomendasi langkah mitigasi konkret dan terarah seketika.</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pillars Section */}
        <div className="space-y-6">
          <ScrollReveal direction="up">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
              Prinsip & Nilai Keamanan Tumbasna
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={100}>
              <div className="p-6 rounded-3xl bg-white border border-border space-y-3 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-background-muted border border-border flex items-center justify-center text-foreground">
                  <Sparkles className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-foreground">Kejelasan (Clarity)</h3>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  Bebas dari istilah teknis membingungkan. Hasil disajikan dalam format yang langsung dimengerti orang awam.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="p-6 rounded-3xl bg-white border border-border space-y-3 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-background-muted border border-border flex items-center justify-center text-foreground">
                  <Eye className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-foreground">Privasi Terjaga</h3>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  Pemrosesan riwayat chat dilindungi sensor data sensitif (nomor telepon & rekening) sebelum dievaluasi.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="p-6 rounded-3xl bg-white border border-border space-y-3 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-background-muted border border-border flex items-center justify-center text-foreground">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-foreground">Transparansi Komunitas</h3>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  Mendukung keterbukaan informasi agar masyarakat saling melindungi dari bahaya penipuan online.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center pt-4">
            <Link href="/analyze">
              <Button size="lg" variant="primary" className="gap-2">
                <span>Coba Periksa Sekarang</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
