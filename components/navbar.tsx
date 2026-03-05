'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const AUDIT_URL = '/audit';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="bg-white rounded-lg p-1">
                  <Image
                    src="/logo.png"
                    alt="Autumn8 Workflow Solutions"
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <div className="hidden md:flex">
                <Link
                  href={AUDIT_URL}
                  className="bg-cta hover:bg-cta-hover text-black text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105"
                >
                  Get Your Free Audit
                </Link>
              </div>

              {/* Mobile toggle */}
              <button
                className="md:hidden text-text-secondary hover:text-text-primary"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden bg-surface border-t border-border"
              >
                <div className="px-4 py-5 flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary text-sm py-1"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <Link
                    href={AUDIT_URL}
                    className="bg-cta hover:bg-cta-hover text-black text-sm font-semibold px-5 py-3 rounded-full text-center mt-1"
                    onClick={() => setOpen(false)}
                  >
                    Get Your Free Audit
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
