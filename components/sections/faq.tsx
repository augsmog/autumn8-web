'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'What exactly does Autumn8 do?',
    a: 'We manage your business operations — leads, scheduling, invoicing, reviews, and reporting — using automation. Think of us as your operations department, powered by technology. You don\'t need to learn any software or change how you work.',
  },
  {
    q: 'How is this different from hiring a marketing agency?',
    a: 'Agencies sell you hours and campaigns. We manage your actual operations. When a lead comes in, we make sure they get a response in under 60 seconds, get booked, get invoiced, and get asked for a review — automatically. We\'re not running your ads. We\'re running everything that happens after someone contacts you.',
  },
  {
    q: 'What industries do you work with?',
    a: 'We specialize in home service businesses: pest control, lawn care, pool maintenance, HVAC, plumbing, painting, and similar trades. If you have 1–25 employees and do service calls, we\'re built for you.',
  },
  {
    q: 'Do I need to learn new software?',
    a: 'No. We set everything up and manage it for you. You\'ll have access to a simple dashboard to see your results, but you\'ll never need to configure or troubleshoot anything. That\'s literally our job.',
  },
  {
    q: "What's the 90-Day Performance Guarantee?",
    a: "If you don't see measurable improvement in your leads, response time, or revenue within 90 days, we continue working at no additional cost until you do. We're confident because our systems work.",
  },
  {
    q: "What's the Founders Program?",
    a: "Our first 3 clients in each market get a permanent discount as founding members. It's our way of building case studies with partners who believe in us early.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. No long-term contracts. We believe if we're delivering value, you'll stay. If we're not, you shouldn't be locked in.",
  },
  {
    q: 'What happens during the first 10 days?',
    a: "We call it the Activation Sprint. We audit your current operations, build your custom automation system, test everything end-to-end, and go live — all within 10 business days. You'll have two calls with us: a kick-off and a walkthrough.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="border-b border-border"
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-text-primary font-medium text-sm sm:text-base group-hover:text-brand-orange transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              FAQ
            </span>
            <h2 className="text-4xl font-bold text-text-primary leading-tight tracking-tight mb-4">
              Questions? Answers.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              If you don&apos;t find what you need,{' '}
              <Link href="/audit" className="text-brand-orange hover:underline">
                schedule a call
              </Link>{' '}
              and we&apos;ll walk through everything.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <div className="lg:col-span-3">
            {inView && FAQS.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
