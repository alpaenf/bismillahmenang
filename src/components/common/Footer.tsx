import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-background-subtle border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="Tumbasna"
                width={150}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
              Cek Dulu Sebelum Tumbas & Transfer. Platform keamanan digital untuk memverifikasi keaslian pesan, chat WhatsApp, dan transaksi online di Indonesia.
            </p>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Layanan
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Periksa Pesan Teks
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Analisis Ekspor Chat WA
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  Cara Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Tentang
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Tentang Tumbasna
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#categories" className="hover:text-foreground transition-colors">
                  Kategori Modus Penipuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Privasi & Keamanan
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Kebijakan Privasi (Data PII)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-muted gap-4">
          <p>© 2026 Tumbasna (tumbasna.my.id). Seluruh hak cipta dilindungi.</p>
          <p>
            Verifikasi aman & data percakapan dilindungi dengan sensor privasi lokal.
          </p>
        </div>
      </div>
    </footer>
  );
}
