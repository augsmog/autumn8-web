'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AUDIT_URL } from '@/lib/constants';

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Free, no-commitment call
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight text-balance">
            Ready to stop losing leads?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Book a free Operations Audit. We&apos;ll map out exactly which automations would have the
            biggest impact on your business — no pitch, no pressure.
          </p>
          <Link
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white font-bold px-10 py-5 rounded-xl text-base transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50"
          >
            Get Your Free Operations Audit
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-white/30 text-xs mt-4">
            30 minutes. No obligation. Founders pricing ends when spots fill.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
