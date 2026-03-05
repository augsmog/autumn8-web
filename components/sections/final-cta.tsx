'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 bg-surface/40 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 grid-texture pointer-events-none opacity-50" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-5 text-balance">
            Stop Losing Customers to Slow Operations
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            Get a free operations audit and see exactly where your business
            is leaving money on the table.
          </p>

          <Link
            href="/audit"
            className="cta-glow group inline-flex items-center gap-3 bg-cta hover:bg-cta-hover text-black font-bold text-xl px-10 py-5 rounded-full transition-all hover:scale-105"
          >
            Get Your Free Operations Audit
            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p className="text-text-muted text-sm mt-5 mb-6">
            No credit card required. 15-minute call. Real insights.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm">
            {['✓ Free audit', '✓ No commitment', '✓ Results in 90 days'].map((item) => (
              <span key={item} className="text-brand-orange/80">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
