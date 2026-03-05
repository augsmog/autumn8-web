'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CASES = [
  {
    company: 'Green Shield Pest Control',
    location: 'Orlando, FL',
    roi: '7.7× ROI',
    quote: 'Autumn8 handled everything. I just focus on my team now.',
    author: 'Marcus Johnson, Owner',
    stats: [
      { label: 'Monthly Revenue', before: '$8,200', after: '$18,400', pct: '+124%' },
      { label: 'Leads/Month', before: '12', after: '47', pct: '+292%' },
      { label: 'Google Rating', before: '3.2★', after: '4.8★', pct: null },
      { label: 'Response Time', before: '4 hrs', after: '8 min', pct: null },
    ],
  },
  {
    company: 'Premier Lawn Pros',
    location: 'Tampa, FL',
    roi: '7.5× ROI',
    quote: 'The reviews alone paid for the service twice over.',
    author: 'Sarah Chen, Owner',
    stats: [
      { label: 'Monthly Revenue', before: '$5,100', after: '$11,800', pct: '+131%' },
      { label: 'Leads/Month', before: '8', after: '31', pct: '+288%' },
      { label: 'Google Rating', before: '3.8★', after: '4.9★', pct: null },
      { label: 'Response Time', before: '6 hrs', after: '12 min', pct: null },
    ],
  },
  {
    company: 'Crystal Clear Pools',
    location: 'Jacksonville, FL',
    roi: '7.0× ROI',
    quote: 'I finally stopped being the bottleneck in my own business.',
    author: 'David Martinez, Owner',
    stats: [
      { label: 'Monthly Revenue', before: '$12,500', after: '$27,200', pct: '+118%' },
      { label: 'Leads/Month', before: '15', after: '52', pct: '+247%' },
      { label: 'Google Rating', before: '4.0★', after: '4.7★', pct: null },
      { label: 'Response Time', before: '3 hrs', after: '5 min', pct: null },
    ],
  },
];

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="results" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            What Happens When Operations Run Themselves
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="relative bg-surface border border-border rounded-xl overflow-hidden"
            >
              {/* Top accent stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-orange to-cta" />

              {/* ROI badge */}
              <div className="absolute top-5 right-5 bg-cta/10 text-cta text-xs font-bold px-3 py-1.5 rounded-full border border-cta/20">
                {c.roi}
              </div>

              <div className="p-7">
                <div className="mb-5">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">{c.company}</h3>
                  <p className="text-text-muted text-sm">{c.location}</p>
                </div>

                {/* Stats 2×2 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {c.stats.map((s) => (
                    <div key={s.label} className="bg-background rounded-lg p-3">
                      <div className="text-text-muted text-xs mb-1">{s.label}</div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-text-muted text-xs line-through">{s.before}</span>
                        <span className="text-brand-orange font-bold text-sm">{s.after}</span>
                        {s.pct && (
                          <span className="text-brand-green text-xs font-semibold">{s.pct}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-brand-orange pl-4">
                  <p className="text-text-secondary text-sm italic leading-relaxed mb-2">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                  <cite className="text-text-muted text-xs not-italic">— {c.author}</cite>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs italic mt-8">
          Results based on projected performance models for demonstration purposes.
        </p>
      </div>
    </section>
  );
}
