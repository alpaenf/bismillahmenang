'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, ShieldAlert, ShieldCheck, AlertTriangle, MessageSquare, ArrowRight, Loader2, Filter, LogIn, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AuthModal } from '@/components/auth/AuthModal';
import type { RiskLevel } from '@/types/analysis';

interface HistoryItem {
  id: string;
  session_type: 'single_message' | 'whatsapp_chat';
  input_text: string | null;
  risk_level: RiskLevel;
  risk_score: number;
  detected_scam_type: string | null;
  summary: string;
  indicators: Array<{ id: string; title: string }>;
  created_at: string;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'single_message' | 'whatsapp_chat'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const supabase = createClient();

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);

      let query = supabase
        .from('analysis_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (session?.user) {
        query = query.eq('user_id', session.user.id);
      }

      const { data, error } = await query;

      if (!error && data) {
        setItems(data as HistoryItem[]);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchType = filterType === 'all' || item.session_type === filterType;
    const matchRisk = filterRisk === 'all' || item.risk_level === filterRisk;
    return matchType && matchRisk;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="py-10 md:py-16 bg-background-subtle/60 min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200 text-xs font-bold text-black">
              <History className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Arsip Pemindaian</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Riwayat Pindai & Analisis
            </h1>
            <p className="text-xs sm:text-sm text-foreground-secondary">
              Daftar seluruh pesan dan percakapan WhatsApp yang telah dievaluasi oleh Tumbasna Security Engine.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchHistory}
              disabled={isLoading}
              className="gap-1.5 text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span>Segarkan</span>
            </Button>
            <Link href="/analyze">
              <Button variant="primary" size="sm" className="bg-black hover:bg-neutral-800 text-white font-bold gap-1.5 text-xs">
                <span>Periksa Pesan Baru</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        {/* User Login Banner if Guest */}
        {!isLoggedIn && (
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neutral-100 text-black">
                <LogIn className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-foreground-secondary leading-relaxed">
                <strong className="text-black block">Simpan Riwayat Anda Secara Permanen</strong>
                Masuk atau buat akun agar riwayat pemeriksaan pesan Anda tersinkronisasi di seluruh perangkat.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAuthModalOpen(true)}
              className="shrink-0 font-bold border-black text-black hover:bg-neutral-100 text-xs"
            >
              Masuk / Daftar
            </Button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-3 bg-white border border-border rounded-2xl text-xs font-medium">
          <div className="flex items-center gap-1.5 text-foreground-secondary pr-2 border-r border-border">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-bold text-black">Filter:</span>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-black text-white font-bold' : 'text-foreground-secondary hover:text-black'
              }`}
            >
              Semua Tipe
            </button>
            <button
              type="button"
              onClick={() => setFilterType('single_message')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'single_message' ? 'bg-black text-white font-bold' : 'text-foreground-secondary hover:text-black'
              }`}
            >
              Pesan Tunggal
            </button>
            <button
              type="button"
              onClick={() => setFilterType('whatsapp_chat')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterType === 'whatsapp_chat' ? 'bg-black text-white font-bold' : 'text-foreground-secondary hover:text-black'
              }`}
            >
              Chat WhatsApp
            </button>
          </div>

          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* Risk Level Filter */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilterRisk('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterRisk === 'all' ? 'bg-neutral-200 text-black font-bold' : 'text-foreground-secondary hover:text-black'
              }`}
            >
              Semua Risiko
            </button>
            <button
              type="button"
              onClick={() => setFilterRisk('critical')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterRisk === 'critical' ? 'bg-red-600 text-white font-bold' : 'text-red-700 hover:bg-red-50'
              }`}
            >
              Kritis
            </button>
            <button
              type="button"
              onClick={() => setFilterRisk('high')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterRisk === 'high' ? 'bg-orange-600 text-white font-bold' : 'text-orange-700 hover:bg-orange-50'
              }`}
            >
              Tinggi
            </button>
            <button
              type="button"
              onClick={() => setFilterRisk('low')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterRisk === 'low' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Rendah
            </button>
          </div>
        </div>

        {/* Content List */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-black" aria-hidden="true" />
            <p className="text-xs font-bold text-foreground-secondary">
              Memuat data riwayat dari Supabase...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white border border-border rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <History className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-black">
                Belum Ada Riwayat Pemindaian
              </h3>
              <p className="text-xs text-foreground-secondary max-w-sm mx-auto leading-relaxed">
                Hasil analisis pesan mencurigakan atau riwayat obrolan WhatsApp akan tersimpan otomatis di sini.
              </p>
            </div>
            <Link href="/analyze">
              <Button size="sm" variant="primary" className="bg-black hover:bg-neutral-800 text-white font-bold">
                Periksa Pesan Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-border hover:border-black rounded-2xl p-5 shadow-xs transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800">
                      {item.session_type === 'single_message' ? 'Pesan Teks' : 'Chat WhatsApp'}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-foreground">
                      Skor: {item.risk_score}/100
                    </span>
                    <Badge variant={item.risk_level} size="sm">
                      {item.risk_level.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-black">
                    {item.detected_scam_type || 'Hasil Pemeriksaan'}
                  </h4>
                  <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                {item.input_text && (
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 font-mono truncate">
                    &ldquo;{item.input_text}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
