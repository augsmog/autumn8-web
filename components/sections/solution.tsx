'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check } from 'lucide-react';

const WITHOUT = [
  'Leads sit for hours without follow-up',
  'Manual invoicing, constant chasing',
  '3.2★ Google rating, no review strategy',
  '15+ hours/week on admin work',
];

const WITH = [
  'Every lead gets a response in under 60 seconds',
  'Invoices sent automatically, payments collected',
  '4.8★ rating with automated review requests',
  'Under 1 hour/week reviewing your dashboard',
];

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            The Solution
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-5">
            We Run Your Operations. You Run Your Business.
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Autumn8 isn&apos;t software you learn. It&apos;s a managed operations team
            powered by automation. We handle everything behind the scenes.
          </p>
        </motion.div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-surface border border-red-500/20 rounded-xl p-8"
          >
            <div className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-5">
              Without Autumn8
            </div>
            <ul className="space-y-4">
              {WITHOUT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                    <X size={11} className="text-red-400" />
                  </span>
                  <span className="text-text-secondary text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-surface border border-brand-orange/20 rounded-xl p-8 shadow-lg shadow-brand-orange/5"
          >
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-5">
              With Autumn8
            </div>
            <ul className="space-y-4">
              {WITH.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5">
                    <Check size={11} className="text-brand-orange" />
                  </span>
                  <span className="text-text-secondary text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
