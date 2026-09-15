import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileWarning, ExternalLink, Clock, Gift, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ExampleAnalysis() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Studi Kasus Nyata
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Lihat Bagaimana Tumbasna Mengurai Penipuan
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              Contoh hasil evaluasi instan pada pesan klaim hadiah fiktif yang sering beredar di WhatsApp dan SMS.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left: Raw Input Message */}
          <ScrollReveal direction="left" distance={30} delay={100} className="h-full">
            <div className="bg-background-subtle border-2 border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">
                    Input Pesan Mencurigakan:
                  </span>
                  <span className="text-xs text-foreground-muted">SMS / WhatsApp Masuk</span>
                </div>

                <div className="bg-white border border-border rounded-2xl p-5 font-mono text-xs sm:text-sm text-foreground leading-relaxed shadow-xs">
                  <p className="text-gray-800">
                    &ldquo;Selamat! Nomor Anda terpilih memenangkan dana tunai <span className="font-bold bg-background-muted px-1.5 py-0.5 rounded text-foreground">Rp 10.000.000</span> dari Program Kejutan Berkah. Klik tautan berikut untuk klaim sebelum batas waktu berakhir: <span className="font-bold underline text-blue-600">https://klaim-dana-berkah.xyz/id-982</span>&rdquo;
                  </p>
                </div>
              </div>

              <div className="text-xs text-foreground-secondary">
                Pesan seperti ini tampak meyakinkan namun dirancang untuk memancing klik cepat sebelum korban sempat berpikir rasional.
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Tumbasna Breakdown Result */}
          <ScrollReveal direction="right" distance={30} delay={200} className="h-full">
            <div className="bg-white border-2 border-risk-critical-border rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">
                    Hasil Evaluasi Tumbasna:
                  </span>
                  <Badge variant="critical" size="sm">
                    CRITICAL RISK
                  </Badge>
                </div>

                {/* Score & Modus */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-risk-critical-bg border border-risk-critical-border">
                  <div className="text-3xl font-extrabold text-risk-critical-text">
                    92<span className="text-sm font-normal text-foreground-secondary">/100</span>
                  </div>
                  <div className="text-xs text-risk-critical-text font-medium">
                    Terindikasi kuat sebagai Phishing Hadiah Palsu & Domain Pencuri Kredensial.
                  </div>
                </div>

                {/* Indicators */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-foreground">Indikator Teridentifikasi:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-border bg-background-subtle flex items-center gap-2">
                      <Gift className="w-4 h-4 text-foreground flex-shrink-0" aria-hidden="true" />
                      <span>Hadiah Uang Fiktif</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-background-subtle flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-foreground flex-shrink-0" aria-hidden="true" />
                      <span>Domain Berisiko (.xyz)</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-border bg-background-subtle flex items-center gap-2 sm:col-span-2">
                      <Clock className="w-4 h-4 text-foreground flex-shrink-0" aria-hidden="true" />
                      <span>Urgensi Waktu Manipulatif</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/analyze" className="w-full">
                <Button variant="primary" size="md" className="w-full justify-center">
                  <span>Coba Periksa Pesan Anda Sendiri</span>
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
