'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, CheckCircle2, Building2, Smartphone, Send, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ReportRecord {
  id: string;
  scam_type: string;
  target_value: string;
  description: string | null;
  status: string;
  created_at: string;
}

interface CheckResult {
  target: string;
  isSuspicious: boolean;
  reportCount: number;
  records: ReportRecord[];
}

export function AccountCheckerSection() {
  const [accountType, setAccountType] = useState<'bank' | 'phone'>('bank');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);

  // Form Lapor Modal
  const [isReporting, setIsReporting] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Silakan masukkan nomor rekening atau nomor telepon terlebih dahulu.');
      return;
    }

    const cleanInput = query.replace(/[^0-9a-zA-Z]/g, '');
    if (cleanInput.length < 5) {
      setErrorMsg('Masukkan minimal 5 digit angka yang valid.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);
    setReportSuccessMsg(null);

    try {
      const res = await fetch(`/api/v1/check-account?target=${encodeURIComponent(cleanInput)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memeriksa data.');
      }

      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke server terputus.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !reportDescription.trim()) return;

    setIsSubmittingReport(true);
    setReportSuccessMsg(null);

    try {
      const res = await fetch('/api/v1/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scamType: accountType === 'bank' ? 'Rekening Bank' : 'Nomor WhatsApp / HP',
          targetValue: query,
          description: reportDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim laporan.');
      }

      setReportSuccessMsg('Laporan Anda berhasil dikirim ke database untuk diverifikasi.');
      setReportDescription('');
      setIsReporting(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirimkan laporan.';
      setErrorMsg(msg);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <section className="py-14 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background-subtle border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-900">
              <ShieldCheck className="w-3.5 h-3.5 text-black" aria-hidden="true" />
              <span>Verifikasi Sebelum Beli</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Cek Nomor Rekening & Telepon Penjual
            </h2>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Periksa rekam jejak nomor rekening bank atau nomor WhatsApp penjual dalam database laporan komunitas sebelum mentransfer dana.
            </p>
          </div>

          {/* Type Toggle & Search Form */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Toggle Tipe Akun */}
            <div className="flex items-center justify-center gap-2 p-1 bg-neutral-200/60 rounded-xl max-w-xs mx-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAccountType('bank');
                  setResult(null);
                  setErrorMsg(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                  accountType === 'bank'
                    ? 'bg-white text-black shadow-xs font-extrabold'
                    : 'text-foreground-secondary hover:text-black'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Rekening Bank</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccountType('phone');
                  setResult(null);
                  setErrorMsg(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
                  accountType === 'phone'
                    ? 'bg-white text-black shadow-xs font-extrabold'
                    : 'text-foreground-secondary hover:text-black'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Nomor Telepon / WA</span>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground-muted">
                  <Search className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder={
                    accountType === 'bank'
                      ? 'Contoh nomor rekening: 5210987654 (BCA, BRI, Mandiri...)'
                      : 'Contoh nomor telepon/WA: 08123456789'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all shadow-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="bg-black hover:bg-neutral-800 text-white font-bold tracking-tight rounded-xl px-6 py-3 shrink-0"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Memeriksa...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>Periksa Sekarang</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                )}
              </Button>
            </form>

            {errorMsg && (
              <p className="text-xs text-red-600 font-medium text-center">
                {errorMsg}
              </p>
            )}

            {reportSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{reportSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Results Display */}
          {result && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-top-3 duration-300">
              {result.isSuspicious ? (
                /* Card Terindikasi Bahaya */
                <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-300 text-red-950 space-y-4 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0">
                      <AlertTriangle className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-red-200 text-red-900 font-extrabold text-xs uppercase tracking-wider">
                        Peringatan Bahaya
                      </div>
                      <h3 className="text-lg font-black text-red-950">
                        Nomor Ini Memiliki Riwayat Laporan Penipuan!
                      </h3>
                      <p className="text-xs text-red-900 leading-relaxed">
                        Ditemukan sebanyak <strong>{result.reportCount} laporan</strong> dugaan penipuan terkait nomor ini di database Tumbasna.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/80 border border-red-200 rounded-xl p-4 space-y-2 text-xs">
                    <div className="font-bold text-red-950 uppercase tracking-wider text-[11px]">
                      Saran Tindakan:
                    </div>
                    <ul className="space-y-1 list-disc list-inside text-red-900">
                      <li>Jangan mentransfer uang atau membagikan bukti transaksi kepada nomor ini.</li>
                      <li>Hindari pengiriman data sensitif seperti KTP, OTP, atau alamat pribadi.</li>
                      <li>Jika belanja online, batalkan transaksi dan pilih penjual resmi yang terpercaya.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* Card Belum Terlapor (Aman / Netral) */
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-emerald-950">
                        Belum Ditemukan Laporan Negatif
                      </h3>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        Nomor <strong>{result.target}</strong> saat ini belum tercatat memiliki laporan penipuan dalam database Tumbasna.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-emerald-200/80 text-xs">
                    <p className="text-emerald-800 text-[11px]">
                      Pernah memiliki pengalaman buruk dengan nomor ini?
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsReporting(!isReporting)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 font-bold text-emerald-900 hover:bg-emerald-100 transition-colors shrink-0"
                    >
                      {isReporting ? 'Tutup Form' : 'Laporkan Nomor Ini'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Pelaporan Mandiri */}
          {isReporting && (
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-white border border-border shadow-md space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-black">
                  Laporkan Dugaan Penipuan
                </h4>
                <p className="text-xs text-foreground-secondary">
                  Bantu lindungi pengguna lain dengan mencatatkan riwayat nomor yang mencurigakan.
                </p>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-3">
                <textarea
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Ceritakan kronologi singkat (contoh: Mengaku admin olshop, barang tidak dikirim setelah transfer)..."
                  className="w-full p-3 bg-background-subtle border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReporting(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isSubmittingReport}
                    className="bg-black hover:bg-neutral-800 text-white font-bold"
                  >
                    {isSubmittingReport ? (
                      'Mengirim...'
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Kirim Laporan</span>
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
