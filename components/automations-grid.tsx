'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AUTOMATIONS } from '@/lib/constants';

export default function AutomationsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            What We Automate
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
            Six systems. All running without you.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every automation is purpose-built for field service businesses — not generic SaaS templates.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AUTOMATIONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/20 transition-all group"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-navy-dark mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
