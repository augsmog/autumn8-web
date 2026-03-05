'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ as FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark">Common questions.</h2>
        </motion.div>

        {/* Items */}
        <div className="divide-y divide-gray-100">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-navy-dark group-hover:text-accent transition-colors leading-snug">
                  {item.question}
                </span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-accent/10 group-hover:text-accent transition-colors mt-0.5">
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 pb-5 leading-relaxed text-sm">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
