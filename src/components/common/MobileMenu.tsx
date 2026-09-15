'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { LogIn, LogOut, History } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isScrolled?: boolean;
  user?: SupabaseUser | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  pathname,
  isScrolled = false,
  user,
  onOpenAuth,
  onLogout,
}: MobileMenuProps) {
  if (!isOpen) return null;

  const links = [
    { label: 'Beranda', href: '/' },
    { label: 'Periksa Pesan & WA', href: '/analyze' },
    { label: 'Riwayat Pindai', href: '/history' },
    { label: 'Cara Kerja', href: '/how-it-works' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Ketentuan Layanan', href: '/terms' },
  ];

  return (
    <div
      className={cn(
        'pointer-events-auto md:hidden fixed z-50 bg-white border border-border shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-2',
        isScrolled
          ? 'top-20 inset-x-4 max-w-md mx-auto rounded-3xl p-5'
          : 'top-16 inset-x-0 border-b p-5'
      )}
    >
      <div className="space-y-3">
        {/* User profile banner on mobile */}
        {user ? (
          <div className="p-3 rounded-2xl bg-neutral-100 flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="font-extrabold text-black block">
                {user.user_metadata?.full_name || 'Pengguna Tumbasna'}
              </span>
              <span className="text-[11px] text-foreground-secondary truncate block">
                {user.email}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout?.();
              }}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 font-bold shrink-0"
              aria-label="Keluar akun"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAuth?.();
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-bold text-black"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            <span>Masuk / Daftar Akun</span>
          </button>
        )}

        <nav className="flex flex-col space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-background-muted text-foreground font-semibold'
                    : 'text-foreground-secondary hover:bg-background-subtle hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-border">
          <Link href="/analyze" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full justify-center rounded-xl bg-black text-white font-bold">
              Periksa Pesan Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
