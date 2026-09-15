'use client';

import React from 'react';
import { X, Smartphone, Apple, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ExportGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportGuideModal({ isOpen, onClose }: ExportGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Cara Ekspor Chat dari WhatsApp
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-muted"
            aria-label="Tutup Panduan"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Instructions Android */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Smartphone className="w-4 h-4 text-foreground" aria-hidden="true" />
            <span>Untuk Pengguna Android:</span>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-foreground-secondary list-decimal list-inside pl-1 leading-relaxed">
            <li>Buka obrolan yang mencurigakan di WhatsApp.</li>
            <li>Ketuk ikon <strong>titik tiga (⋮)</strong> di pojok kanan atas.</li>
            <li>Pilih <strong>Lainnya (More)</strong> → <strong>Ekspor Chat (Export Chat)</strong>.</li>
            <li>
              Pilih <strong>Tanpa Media (Without Media)</strong> (menghasilkan file <code className="bg-background-muted px-1.5 py-0.5 rounded text-foreground font-mono">.txt</code>).
            </li>
            <li>Simpan atau kirim file teks tersebut ke perangkat Anda dan unggah ke Tumbasna.</li>
          </ol>
        </div>

        {/* Instructions iOS */}
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Apple className="w-4 h-4 text-gray-800" aria-hidden="true" />
            <span>Untuk Pengguna iPhone (iOS):</span>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-foreground-secondary list-decimal list-inside pl-1 leading-relaxed">
            <li>Buka percakapan di WhatsApp, lalu ketuk nama kontak di bagian atas layar.</li>
            <li>Gulir ke bawah dan ketuk <strong>Ekspor Chat (Export Chat)</strong>.</li>
            <li>Pilih <strong>Tanpa Media (Without Media)</strong>.</li>
            <li>Simpan file ke <em>Files</em> di iPhone Anda, lalu pilih file tersebut di Tumbasna.</li>
          </ol>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 bg-background-subtle rounded-xl border border-border flex items-start gap-2.5 text-xs text-foreground-secondary">
          <ShieldAlert className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            File chat Anda <strong>tidak diunggah ke server sebagai file fisik</strong>. Pemrosesan dilakukan 100% di browser dengan opsi sensor nomor telepon & data rekening.
          </p>
        </div>

        {/* Footer Button */}
        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="md" onClick={onClose} className="w-full sm:w-auto">
            <CheckCircle2 className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Saya Mengerti
          </Button>
        </div>
      </div>
    </div>
  );
}
