'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Star, Clock } from 'lucide-react';

const OUTCOMES = [
  {
    stat: '7×',
    label: 'Average ROI',
    sub: 'in the first 90 days',
    Icon: TrendingUp,
  },
  {
    stat: '4.8★',
    label: 'Google Rating',
    sub: 'up from 3.2★ average',
    Icon: Star,
  },
  {
    stat: '8 min',
    label: 'Lead Response',
    sub: 'down from 4+ hours',
    Icon: Clock,
  },
];

const QUOTES = [
  { quote: 'Autumn8 handled everything. I just focus on my team now.', author: 'Marcus J., Pest Control' },
  { quote: 'The reviews alone paid for the service twice over.', author: 'Sarah C., Lawn Care' },
  { quote: 'I finally stopped being the bottleneck in my own business.', author: 'David M., Pool Service' },
];

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="results" ref={ref} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            What Happens When Operations Run Themselves
          </h2>
        </motion.div>

        {/* 3 key outcome stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {OUTCOMES.map((o, i) => {
            const Icon = o.Icon;
            return (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-surface border border-border rounded-xl p-8 text-center"
              >
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-5 h-5 text-brand-orange" />
                </div>
                <div className="text-5xl font-bold text-text-primary mb-2">{o.stat}</div>
                <div className="text-text-primary font-semibold text-sm mb-1">{o.label}</div>
                <div className="text-text-muted text-xs">{o.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Client quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q, i) => (
            <motion.blockquote
              key={q.author}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * i }}
              className="bg-surface border border-border rounded-xl p-6 border-l-2 border-l-brand-orange"
            >
              <p className="text-text-secondary text-sm italic leading-relaxed mb-3">
                &ldquo;{q.quote}&rdquo;
              </p>
              <cite className="text-text-muted text-xs not-italic">— {q.author}</cite>
            </motion.blockquote>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs italic mt-8">
          Results based on projected performance models for demonstration purposes.
        </p>
      </div>
    </section>
  );
}
