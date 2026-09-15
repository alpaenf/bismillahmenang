'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, History, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { AuthModal } from '@/components/auth/AuthModal';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Check user session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Periksa Pesan & WA', href: '/analyze' },
    { label: 'Riwayat Pindai', href: '/history' },
    { label: 'Cara Kerja', href: '/how-it-works' },
    { label: 'Tentang Kami', href: '/about' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 z-40 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'top-3 sm:top-4 px-4 sm:px-6 flex justify-center pointer-events-none'
            : 'top-0 w-full'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto transition-all duration-300 ease-in-out flex items-center justify-between',
            isScrolled
              ? 'w-full max-w-4xl mx-auto rounded-full bg-white/90 backdrop-blur-xl border border-border/80 shadow-lg shadow-black/5 px-5 sm:px-7 h-14'
              : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 bg-white/95 backdrop-blur-md border-b border-border'
          )}
        >
          {/* Brand Logo Tumbasna */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Tumbasna"
              width={160}
              height={44}
              priority
              className={cn(
                'w-auto object-contain transition-all duration-300',
                isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9'
              )}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold tracking-tight text-foreground/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground',
                    isActive ? 'text-foreground font-extrabold' : ''
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 px-3 rounded-xl border border-border hover:border-black bg-white text-xs font-bold text-black transition-all shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">
                    {user.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-2xl shadow-xl p-2 space-y-1 text-xs font-semibold animate-in fade-in">
                    <div className="px-3 py-2 border-b border-border text-[11px] text-foreground-secondary truncate">
                      {user.email}
                    </div>
                    <Link
                      href="/history"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-foreground hover:bg-neutral-100 transition-colors"
                    >
                      <History className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Riwayat Pindai</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-foreground hover:text-black hover:bg-neutral-100 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Masuk</span>
              </button>
            )}

            <Link href="/analyze">
              <Button
                size={isScrolled ? 'sm' : 'md'}
                variant="primary"
                className={cn(
                  'transition-all duration-300 font-bold tracking-tight bg-black hover:bg-neutral-800 text-white shadow-sm',
                  isScrolled ? 'rounded-full px-4 text-xs' : 'rounded-xl'
                )}
              >
                Cek Pesan / Chat
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-muted focus:outline-none focus:ring-2 focus:ring-foreground"
              aria-label={isOpen ? 'Tutup Menu' : 'Buka Menu Navigasi'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pathname={pathname}
          isScrolled={isScrolled}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Spacer to prevent content jump behind fixed header */}
      <div className="h-16 w-full" aria-hidden="true" />
    </>
  );
}
