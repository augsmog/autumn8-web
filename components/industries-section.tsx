'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { SEGMENTS } from '@/lib/constants';

export default function IndustriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="industries" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Who We Serve
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-dark mb-4">
            Built for any service business.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From solo operators running a few routes to PE-backed rollups managing 20+ locations.
            If you schedule jobs and invoice after completion, Autumn8 handles everything between.
          </p>
        </motion.div>

        {/* Segment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SEGMENTS.map((segment, i) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-accent/20 transition-all"
            >
              <div className="text-4xl mb-5">{segment.icon}</div>
              <h3 className="text-xl font-bold text-navy-dark mb-3">{segment.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{segment.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Link to industries page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
          >
            See all verticals we serve, including our PE rollup approach
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
