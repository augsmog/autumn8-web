'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AUDIT_URL } from '@/lib/constants';

const INCLUDED = [
  'Speed-to-lead SMS & email',
  'Appointment reminders',
  'Invoice follow-up',
  'Review request automation',
  'Monthly performance report',
  'Onboarding + monthly call',
];

export default function PricingTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="bg-navy-dark rounded-3xl p-10 md:p-14 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Founders Pricing — limited spots
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Starting at{' '}
                <span className="text-accent">$1,297</span>
                <span className="text-white/50 text-xl font-normal">/month</span>
              </h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                No setup fees. No long-term contracts after 90 days. We earn the relationship month to month.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={AUDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  Book Free Audit
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  See All Plans
                </Link>
              </div>
            </div>

            {/* Right — included items */}
            <div>
              <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
                Every plan includes
              </div>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                      <Check size={11} className="text-accent" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
