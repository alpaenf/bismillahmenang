import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clipboard, Cpu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function StepGuideSection() {
  const steps = [
    {
      num: '01',
      title: 'Tempelkan Pesan atau Chat WA',
      desc: 'Salin potongan pesan teks yang mencurigakan atau unggah file .txt hasil ekspor chat WhatsApp Anda.',
      icon: <Clipboard className="w-5 h-5 text-foreground" aria-hidden="true" />,
    },
    {
      num: '02',
      title: 'Sistem Menganalisis Pola',
      desc: 'Tumbasna memeriksa kata kunci ancaman, link phising, file APK, desakan waktu, dan modus rekayasa sosial.',
      icon: <Cpu className="w-5 h-5 text-foreground" aria-hidden="true" />,
    },
    {
      num: '03',
      title: 'Pahami & Ambil Tindakan Aman',
      desc: 'Dapatkan skor risiko, detail alasan mengapa pesan mencurigakan, serta rekomendasi langkah konkret untuk mengamankan diri.',
      icon: <ShieldCheck className="w-5 h-5 text-foreground" aria-hidden="true" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background-subtle border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
              Alur Pemeriksaan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Cara Kerja Tumbasna dalam 3 Langkah
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              Proses pemeriksaan cepat, aman, dan mudah dipahami tanpa perlu pengetahuan teknis keamanan siber.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} direction="up" distance={30}>
              <div className="relative bg-white border border-border p-8 rounded-3xl space-y-4 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-gray-200">
                    {s.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-background-muted border border-border flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="mt-12 text-center">
            <Link href="/how-it-works">
              <Button variant="outline" size="md" className="gap-2">
                <span>Pelajari Alur Kerja Lebih Lanjut</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
