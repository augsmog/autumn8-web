'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, DollarSign, Star, X as XIcon } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Star, label: '4.9★ Average Client Rating' },
  { icon: Shield, label: '90-Day Performance Guarantee' },
  { icon: DollarSign, label: '$0 Setup Fees' },
  { icon: XIcon, label: 'Cancel Anytime' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(249,115,22,0.12),transparent)] pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Logo — large, hero treatment */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-white rounded-2xl px-6 py-4 shadow-lg shadow-black/40">
            <Image
              src="/logo.png"
              alt="Autumn8 Workflow Solutions"
              width={220}
              height={72}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* H1 — two lines, staggered */}
        <div className="mb-6">
          {['Stop Running Your Business.', 'Start Growing It.'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.2, ease: 'easeOut' }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight gradient-text">
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We manage your leads, scheduling, invoicing, reviews, and reporting —
          so you can focus on the work that matters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/pricing"
            className="cta-glow group flex items-center gap-2 bg-cta hover:bg-cta-hover text-black font-semibold text-lg px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="border border-border text-text-secondary hover:text-text-primary hover:border-zinc-500 font-medium text-lg px-8 py-4 rounded-full transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <span className="text-text-muted text-sm">Trusted by service businesses across Florida</span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-1.5 text-text-muted text-sm">
                <Icon size={14} className="text-brand-orange" />
                {item.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
