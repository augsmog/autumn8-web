'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Zap, Shield, Rocket } from 'lucide-react';

const STEPS = [
  {
    Icon: Search,
    day: 'Day 1–2',
    title: 'Operations Audit',
    desc: 'We analyze your current operations, identify gaps, and build your custom automation roadmap.',
  },
  {
    Icon: Zap,
    day: 'Day 3–10',
    title: 'Activation Sprint',
    desc: 'Our team builds and configures your entire operations system — leads, booking, invoicing, reviews, reporting.',
  },
  {
    Icon: Shield,
    day: 'Week 2–4',
    title: 'Supervised Automation',
    desc: 'Everything goes live with human oversight. We fine-tune based on real results and your feedback.',
  },
  {
    Icon: Rocket,
    day: 'Month 2+',
    title: 'Full Operations Mode',
    desc: 'Your business runs on autopilot. You get a monthly performance report and a 15-minute check-in call.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            Live in 10 Days. Results in 30.
          </h2>
        </motion.div>

        {/* Steps — horizontal desktop, vertical mobile */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-brand-orange/40 via-brand-orange to-brand-orange/40" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center"
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-brand-orange/10 border-2 border-brand-orange flex items-center justify-center mb-5 flex-shrink-0">
                    <Icon className="w-7 h-7 text-brand-orange" />
                  </div>
                  <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-2">
                    {step.day}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
