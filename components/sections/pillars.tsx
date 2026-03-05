'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Calendar, Receipt, Star, UserPlus, BarChart3 } from 'lucide-react';

const PILLARS = [
  {
    Icon: Users,
    title: 'Customer Acquisition Engine',
    description: 'Speed-to-lead SMS in under 60 seconds. Automated follow-ups. No lead falls through the cracks.',
  },
  {
    Icon: Calendar,
    title: 'Smart Scheduling System',
    description: 'Online booking, automated confirmations and reminders. No-show rate drops by 40%+.',
  },
  {
    Icon: Receipt,
    title: 'Automated Invoicing',
    description: 'Invoices generated and sent automatically. Payment reminders handle the awkward follow-ups for you.',
  },
  {
    Icon: Star,
    title: 'Reputation Management',
    description: 'Automated review requests after every job. AI-crafted responses. Watch your Google rating climb.',
  },
  {
    Icon: UserPlus,
    title: 'Hiring Pipeline',
    description: 'Job postings, applicant screening, and interview scheduling to keep your team fully staffed.',
  },
  {
    Icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Real-time dashboards showing leads, revenue, reviews, and trends. Monthly performance reports delivered to your inbox.',
  },
];

export default function Pillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            What We Manage
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-4">
            Six Pillars. One Platform. Zero Learning Curve.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Every piece of your operations, handled.
          </p>
        </motion.div>

        {/* 3×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.Icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                whileHover={{ scale: 1.02 }}
                className="group bg-surface border border-border hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5 rounded-xl p-8 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
