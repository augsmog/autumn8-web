'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

const TIERS = [
  {
    name: 'Foundation',
    price: 1297,
    foundersPrice: 897,
    team: 'For teams of 1–5',
    features: [
      'Speed-to-lead automation',
      'Appointment scheduling & reminders',
      'Automated invoicing & payment collection',
      'Google review management',
      'Monthly performance report',
      '15-minute monthly check-in call',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 2497,
    foundersPrice: 2097,
    team: 'For teams of 5–15',
    features: [
      'Everything in Foundation',
      'Multi-channel lead capture',
      'Hiring pipeline automation',
      'Competitor monitoring',
      'Quarterly business review',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    price: 4497,
    foundersPrice: 4097,
    team: 'For teams of 15–25',
    features: [
      'Everything in Growth',
      'Multi-location support',
      'Custom integrations',
      'Dedicated account manager',
      'Weekly performance calls',
      'Custom reporting dashboard',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary text-lg">No contracts. No hidden fees. Cancel anytime.</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-10">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`relative rounded-xl p-8 flex flex-col ${
                tier.popular
                  ? 'bg-surface ring-2 ring-brand-orange scale-[1.02] shadow-xl shadow-brand-orange/10'
                  : 'bg-surface border border-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-2">
                <span className="text-xs text-text-muted">{tier.team}</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">{tier.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-text-primary">
                    ${tier.foundersPrice.toLocaleString()}
                  </span>
                  <span className="text-text-muted text-sm">/mo</span>
                </div>
                <div className="text-text-muted text-sm">
                  <span className="line-through">${tier.price.toLocaleString()}/mo</span>
                  <span className="ml-2 text-cta font-semibold">Founders Price</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5">
                      <Check size={11} className="text-brand-orange" />
                    </span>
                    <span className="text-text-secondary text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/audit"
                className={`flex items-center justify-center font-semibold px-6 py-3.5 rounded-full transition-all text-sm ${
                  tier.popular
                    ? 'bg-cta hover:bg-cta-hover text-black hover:scale-105'
                    : 'border border-border text-text-secondary hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                Start Your Free Audit
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ramp note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-surface border border-border rounded-xl p-6 text-center mb-5 max-w-2xl mx-auto"
        >
          <div className="inline-block bg-cta/10 text-cta text-xs font-bold px-3 py-1 rounded-full mb-3">
            LIMITED AVAILABILITY
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            <span className="text-text-primary font-semibold">Ramp pricing: </span>
            Start at just $297/month → $597 month 2 → $997 month 3 → full price month 4
          </p>
          <p className="text-text-muted text-xs mt-2">
            Founders Program: First 3 clients per market lock in permanent savings.
          </p>
        </motion.div>

        {/* 90-day guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border border-brand-orange/20 bg-brand-orange/5 rounded-xl p-6 flex items-start gap-4 max-w-2xl mx-auto"
        >
          <ShieldCheck className="w-8 h-8 text-brand-orange flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-text-primary mb-1.5 text-sm">90-Day Performance Guarantee</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              If you don&apos;t see measurable improvement in leads, response time,
              or revenue within 90 days, we keep working for free until you do.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
