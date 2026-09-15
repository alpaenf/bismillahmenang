import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tumbasna — Cek Sebelum Beli & Transfer | Deteksi Penipuan Online & Chat WA',
  description:
    'Platform keamanan digital & verifikasi transaksi online. Periksa pesan mencurigakan, tautan phising, APK malware, dan chat WhatsApp sebelum Anda bertransaksi, transfer dana, atau belanja (tumbas).',
  keywords: [
    'tumbasna',
    'anti scam indonesia',
    'cek toko online penipu',
    'cek rekening penipu',
    'cek pesan penipuan',
    'deteksi chat wa penipuan',
    'cek link phising',
    'malware apk kurir',
    'belanja online aman',
  ],
  authors: [{ name: 'Tumbasna Security Team' }],
  metadataBase: new URL('https://tumbasna.my.id'),
  openGraph: {
    title: 'Tumbasna — Cek Sebelum Beli & Transfer',
    description:
      'Periksa pesan mencurigakan dan riwayat chat WhatsApp untuk mendeteksi indikasi penipuan sebelum mentransfer dana atau belanja online.',
    url: 'https://tumbasna.my.id',
    siteName: 'Tumbasna',
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={fontSans.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-white text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
