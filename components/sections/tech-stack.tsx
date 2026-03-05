'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TOOLS = [
  { name: 'Twilio', desc: 'SMS & Voice' },
  { name: 'Stripe', desc: 'Payments' },
  { name: 'GoHighLevel', desc: 'CRM & Automation' },
  { name: 'Resend', desc: 'Email Delivery' },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-background border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Powered by Enterprise-Grade Tools
          </h3>
          <p className="text-text-muted text-sm mb-8">
            You don&apos;t manage any of this. We do.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="bg-surface border border-border rounded-lg px-5 py-3 flex items-center gap-3"
              >
                <span className="text-text-primary text-sm font-medium">{tool.name}</span>
                <span className="text-text-muted text-xs">{tool.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
