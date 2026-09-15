import React from 'react';
import { Search, Lightbulb, CheckSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ValuePropSection() {
  const values = [
    {
      icon: Search,
      title: 'Detect (Deteksi Cepat)',
      description:
        'Sistem mendeteksi pola kalimat manipulatif, tautan phishing mencurigakan, ekstensi file berbahaya (.APK), dan impersonasi institusi resmi.',
    },
    {
      icon: Lightbulb,
      title: 'Understand (Pahami Alasan)',
      description:
        'Kami tidak hanya memberi label "Scam", tapi menguraikan indikator spesifik dan kronologi mengapa sebuah pesan atau chat WA berbahaya.',
    },
    {
      icon: CheckSquare,
      title: 'Act (Ambil Tindakan Aman)',
      description:
        'Dapatkan panduan langkah konkret dan terarah mengenai apa yang harus dilakukan: blokir, abaikan, amankan rekening, atau konfirmasi resmi.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background-subtle border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Lebih dari Sekadar Pengecek Pesan
            </h2>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              Tumbasna membantu Anda mengambil keputusan tepat sebelum risiko penipuan digital terjadi saat belanja atau bertransaksi online.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <ScrollReveal key={i} delay={i * 150} direction="up" distance={30}>
                <Card className="bg-white border border-border p-8 rounded-3xl group hover:border-foreground hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-background-muted border border-border flex items-center justify-center mb-6 shadow-xs group-hover:bg-foreground group-hover:border-foreground transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {v.description}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
