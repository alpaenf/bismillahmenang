'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Periksa Pesan & WA', href: '/analyze' },
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
              ? 'w-full max-w-4xl mx-auto rounded-full bg-white/85 backdrop-blur-xl border border-border/80 shadow-lg shadow-black/5 px-5 sm:px-7 h-14'
              : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 bg-white/95 backdrop-blur-md border-b border-border'
          )}
        >
          {/* Brand Logo Tumbasna */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                Tumbasna
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-full border border-emerald-200">
                Safe
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-foreground',
                    isActive ? 'text-foreground font-semibold' : ''
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/analyze">
              <Button
                size={isScrolled ? 'sm' : 'md'}
                variant="primary"
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'rounded-full px-4 text-xs font-semibold' : 'rounded-xl'
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
        />
      </header>

      {/* Spacer to prevent content jump behind fixed header */}
      <div className="h-16 w-full" aria-hidden="true" />
    </>
  );
}
