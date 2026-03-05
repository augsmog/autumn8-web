'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const PAIN_POINTS = [
  {
    stat: '62%',
    label: 'Of calls to service businesses go unanswered',
    detail: 'Every missed call is a lead that calls your competitor next.',
  },
  {
    stat: '4+ hrs',
    label: 'Average wait time for a lead follow-up',
    detail: 'Studies show response within 5 minutes increases conversion by 21x.',
  },
  {
    stat: '1 in 3',
    label: 'Invoices are paid late without automated reminders',
    detail: 'Cash flow problems start with forgetting to follow up.',
  },
];

export default function PainPoints() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-navy-dark py-16 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((p, i) => (
            <motion.div
              key={p.stat}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-accent mb-2">{p.stat}</div>
              <div className="text-white font-semibold mb-1.5 leading-snug">{p.label}</div>
              <div className="text-sm text-white/50 leading-relaxed">{p.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
