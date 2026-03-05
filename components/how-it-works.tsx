'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    number: '01',
    title: 'We Set It Up',
    description:
      'On your onboarding call, we map your current process. Within 5 business days, your automations are live — connected to your existing tools.',
    detail: 'No software to learn. No IT department needed. We handle everything.',
  },
  {
    number: '02',
    title: 'Automations Run',
    description:
      'Lead follow-up, appointment reminders, invoice nudges, review requests — all firing automatically, 24/7, without you touching a thing.',
    detail: 'Every trigger is logged. Every message is tracked. Nothing falls through.',
  },
  {
    number: '03',
    title: 'You Get Reports',
    description:
      'Every month you get a plain-English report: leads, conversions, response times, reviews, and revenue. We flag what needs your attention.',
    detail: 'Plus a monthly call to review performance and adjust automations.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
            Up and running in 5 days.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We do the implementation. You stay focused on running your business.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
                  {/* Step number */}
                  <div className="w-12 h-12 rounded-xl bg-navy-dark flex items-center justify-center mb-5">
                    <span className="text-accent font-bold text-sm">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">{step.description}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
