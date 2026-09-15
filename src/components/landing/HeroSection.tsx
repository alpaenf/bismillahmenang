import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertTriangle, FileWarning } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[11px] sm:text-xs font-semibold text-red-950 max-w-full whitespace-nowrap shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span className="font-extrabold tracking-tight">Tumbasna Security Engine</span>
              <span className="text-red-300">•</span>
              <span className="flex items-center gap-1 font-bold flex-shrink-0 text-red-800">
                <WhatsAppIcon colored size={13} />
                <span>Analisis Chat WA & Pesan</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.08]">
              Cek Dulu Sebelum <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-black">
                Tumbas & Transfer.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Platform keamanan digital dan verifikasi transaksi online. Periksa pesan mencurigakan, phishing link, dan riwayat percakapan WhatsApp sebelum Anda mentransfer dana, membagikan OTP, atau belanja online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/analyze" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full justify-center">
                  <span>Mulai Periksa Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full justify-center">
                  Cara Kerja
                </Button>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-foreground-secondary">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>100% Gratis & Bebas Akses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Privasi Terjaga (Sensor PII Lokal)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border-2 border-border rounded-3xl p-6 shadow-xl space-y-4">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <Badge variant="critical" size="sm">
                  HIGH RISK (88/100)
                </Badge>
              </div>

              {/* Sample Message Bubble */}
              <div className="bg-background-subtle border border-border rounded-xl p-3.5 text-xs text-foreground space-y-1">
                <div className="text-[10px] font-bold text-foreground-muted">Pesan Masuk WhatsApp:</div>
                <p className="leading-relaxed">
                  &ldquo;Paket Anda tertahan. Cek foto detail resi di file <span className="font-bold underline text-risk-critical-text">LIHAT_RESI.apk</span> sekarang agar tidak diretur.&rdquo;
                </p>
              </div>

              {/* Detected Indicators Mockup */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold text-foreground-muted uppercase tracking-wider">
                  Indikator Terdeteksi:
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-risk-critical-bg border border-risk-critical-border text-xs text-risk-critical-text">
                  <FileWarning className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-semibold">Malware Android (.APK Kurir Palsu)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-risk-high-bg border border-risk-high-border text-xs text-risk-high-text">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-semibold">Tekanan Waktu & Ancaman Retur</span>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="p-3 rounded-xl bg-foreground text-white text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  Saran Keamanan Tumbasna:
                </div>
                <p className="text-gray-300 text-[11px] leading-tight">
                  Jangan pernah unduh atau instal file .APK dari nomor tidak dikenal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
