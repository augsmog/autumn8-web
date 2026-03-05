'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { STATS } from '@/lib/constants';

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real numbers. No guesswork.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            These aren&apos;t industry averages — they&apos;re the benchmarks we build toward for every client.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/8 transition-colors"
            >
              <div className="text-4xl font-bold text-accent mb-3">{stat.value}</div>
              <div className="text-sm text-white/60 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
