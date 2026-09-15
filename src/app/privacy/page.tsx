import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, EyeOff, Lock, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi & Perlindungan Data PII | Tumbasna',
  description:
    'Komitmen Tumbasna dalam melindungi data privasi pengguna, penyensoran otomatis data pribadi (PII masking), dan pemrosesan lokal.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
            Perlindungan Data Pribadi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Kebijakan Privasi Tumbasna
          </h1>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Terakhir diperbarui: 31 Agustus 2026 • Selaras dengan UU PDP No. 27/2022
          </p>
        </div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <EyeOff className="w-4 h-4 text-foreground" aria-hidden="true" />
              <span>Sensor Data Pribadi (PII)</span>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Nomor telepon, nomor rekening, NIK, dan email secara default disensor di browser sebelum data dianalisis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Trash2 className="w-4 h-4 text-foreground" aria-hidden="true" />
              <span>Tanpa Penyimpanan Permanen</span>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Riwayat obrolan dan teks pesan Anda tidak disimpan di server kami. Seluruh sesi otomatis terhapus saat tab ditutup.
            </p>
          </div>
        </div>

        {/* Legal Text Content */}
        <div className="prose prose-sm max-w-none text-foreground-secondary space-y-8 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              1. Pemrosesan File Ekspor WhatsApp
            </h2>
            <p>
              Saat Anda mengunggah file teks (<code className="bg-background-muted px-1.5 py-0.5 rounded text-foreground font-mono">.txt</code>) hasil ekspor percakapan WhatsApp, file tersebut dibaca secara lokal di browser Anda menggunakan JavaScript Client-Side. File biner media (gambar, video, audio) tidak diikutsertakan dan diabaikan secara otomatis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              2. Teknologi Sensor Data Pribadi (PII Masking)
            </h2>
            <p>
              Kami menerapkan modul deteksi ekspresi reguler (RegEx) untuk menyamarkan data sensitif seperti nomor telepon (+62 8xx), nomor rekening bank (10–16 digit), dan alamat email menjadi format tersensor sebelum dievaluasi oleh sistem deteksi pola.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              3. Penggunaan Data Analisis
            </h2>
            <p>
              Teks pesan hanya digunakan untuk tujuan penilaian risiko penipuan secara instan pada saat permintaan dikirimkan. Kami tidak menjual, menyewakan, atau membagikan transkrip percakapan pribadi Anda kepada pihak ketiga manapun untuk keperluan periklanan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              4. Keamanan & Enkripsi
            </h2>
            <p>
              Seluruh transmisi data antara peramban web pengguna dan layanan API diamankan menggunakan enkripsi standar industri HTTPS (TLS 1.3).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              5. Hak Pengguna
            </h2>
            <p>
              Anda berhak membersihkan sesi kapan saja dengan menekan tombol <em>&ldquo;Ganti File&rdquo;</em> atau <em>&ldquo;Bersihkan&rdquo;</em>. Sesi Anda akan langsung dihapus dari memori peramban (*RAM*).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
