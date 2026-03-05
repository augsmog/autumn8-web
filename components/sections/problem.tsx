'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const STATS = [
  { number: 62, suffix: '%', label: 'of calls to service businesses go unanswered' },
  { number: 78, suffix: '%', label: 'of customers hire the first company to respond' },
  { number: 15, suffix: '+ hrs', label: 'per week the average owner spends on admin' },
  { number: 23, suffix: '%', label: 'of revenue lost to no-shows and late invoices' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl font-bold text-red-400 block mb-2">
      {count}{suffix}
    </span>
  );
}

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              The Problem
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-6">
              Your Business Is Leaking Money Every Day
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              While you&apos;re out doing the actual work, calls go unanswered,
              leads go cold, invoices go unpaid, and competitors who respond
              faster are winning the customers that should be yours.
            </p>
          </motion.div>

          {/* Right — 2×2 stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <CountUp target={stat.number} suffix={stat.suffix} />
                <p className="text-text-secondary text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
