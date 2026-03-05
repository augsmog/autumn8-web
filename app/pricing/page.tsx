'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_TIERS, AUDIT_URL } from '@/lib/constants';
import CTABanner from '@/components/cta-banner';

const BILLING_FAQ = [
  {
    q: 'What is Founders Pricing?',
    a: "Our first 10 clients lock in their monthly rate for life. We're filling those spots now. Pricing increases as we scale capacity.",
  },
  {
    q: 'Is there a setup fee?',
    a: 'No setup fees. The first 90 days include full onboarding and implementation — that\'s covered in your monthly rate.',
  },
  {
    q: 'What does the 90-day commitment cover?',
    a: 'Building the automations takes time to do right. The 90-day minimum ensures we can implement, test, and optimize your systems before they run on autopilot.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes. You can upgrade at any time. Downgrades take effect at the start of the next billing cycle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We invoice monthly via Stripe. Major credit cards and ACH bank transfers accepted.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Founders Pricing — 3 spots remaining
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            No setup fees. No contracts after 90 days. Cancel anytime after the initial commitment period.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-navy-dark border-2 border-accent shadow-xl shadow-accent/10'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      tier.highlighted ? 'text-white' : 'text-navy-dark'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className={`text-sm leading-snug ${tier.highlighted ? 'text-white/60' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="mb-7">
                  <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-navy-dark'}`}>
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className={`text-sm ml-1 ${tier.highlighted ? 'text-white/50' : 'text-gray-400'}`}>
                    /month
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          tier.highlighted ? 'bg-accent/20' : 'bg-accent/10'
                        }`}
                      >
                        <Check size={11} className="text-accent" />
                      </span>
                      <span className={`text-sm ${tier.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={AUDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm ${
                    tier.highlighted
                      ? 'bg-accent hover:bg-accent-dark text-white'
                      : 'border border-navy-dark/20 text-navy-dark hover:bg-navy-dark hover:text-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Ramp pricing note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              <span className="font-semibold text-navy-dark">Founders pricing note:</span> Early clients lock in their
              rate for life. Pricing increases as we reach capacity — not based on arbitrary timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Billing FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-dark text-center mb-10">Billing questions</h2>
          <div className="divide-y divide-gray-100">
            {BILLING_FAQ.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-semibold text-navy-dark mb-2">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
