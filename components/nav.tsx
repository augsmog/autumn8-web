'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AUDIT_URL, CLIENT_LOGIN_URL } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Who We Serve', href: '/industries' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-deeper/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              autumn<span className="text-accent">8</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={CLIENT_LOGIN_URL}
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client Login →
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={AUDIT_URL}
              className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Audit
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-deeper border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={CLIENT_LOGIN_URL}
              className="text-white/50 hover:text-white/80 text-sm py-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Client Login →
            </Link>
            <Link
              href={AUDIT_URL}
              className="bg-accent text-white text-sm font-semibold px-5 py-3 rounded-lg text-center mt-2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Book Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
