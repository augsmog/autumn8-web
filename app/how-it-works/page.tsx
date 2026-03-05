'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Brain, Users } from 'lucide-react';
import { AUDIT_URL } from '@/lib/constants';
import CTABanner from '@/components/cta-banner';

const LAYERS = [
  {
    icon: Zap,
    label: 'Layer 1',
    title: 'Direct API Automation',
    subtitle: 'Instant. Zero AI cost. Runs 24/7.',
    description:
      'The backbone of the system. Every trigger — new lead, completed job, overdue invoice — fires a direct API call to GoHighLevel, Twilio, or Stripe. No AI, no delay, no cost per message.',
    examples: [
      'New lead form submitted → SMS sent within 60 seconds',
      'Appointment booked → reminder sequence activated',
      'Invoice 7 days overdue → automated follow-up sequence',
      'Job marked complete → review request sent',
    ],
    color: 'accent',
  },
  {
    icon: Brain,
    label: 'Layer 2',
    title: 'AI Operations Layer',
    subtitle: 'Weekly insights. Smart responses. Escalation briefs.',
    description:
      'Claude AI runs on a batch schedule — not on every trigger. This keeps costs minimal while delivering genuine intelligence: personalized review responses, weekly summaries that actually make sense, and escalation alerts when something needs human attention.',
    examples: [
      '4-5★ Google review → AI drafts and posts a response',
      'Monday → weekly performance summary emailed to you',
      'Lead volume drops 30% → escalation brief with context',
      'Monthly → full performance report with analysis',
    ],
    color: 'navy',
  },
  {
    icon: Users,
    label: 'Layer 3',
    title: 'Human Layer',
    subtitle: 'Monthly call. Report review. Edge cases.',
    description:
      "Automation handles the predictable. You handle the judgment calls — with our support. Every month we review your report together, adjust automations based on what's working, and flag anything that needs your decision.",
    examples: [
      'Monthly 30-minute performance review call',
      'Quarterly automation roadmap update',
      'Escalation alerts when patterns need your attention',
      'Direct access when something needs a human decision',
    ],
    color: 'accent',
  },
];

const TIMELINE = [
  { time: '6:00 AM', event: 'AI batch runs — weekly summaries processed, anomalies flagged' },
  { time: '7:00 AM', event: 'Daily health check — lead counts, SMS delivery rates, invoice status pulled' },
  { time: '9:00 AM', event: 'New lead submits a form — SMS fires within 60 seconds, lead scored' },
  { time: '11:00 AM', event: '5-star Google review posted — AI response drafted and published within the hour' },
  { time: '2:00 PM', event: 'Job completed — review request queued for optimal send time (next morning)' },
  { time: '6:00 PM', event: 'Anomaly detection — lead volume vs. 30-day rolling average checked' },
  { time: '11:59 PM', event: 'Invoice aged 7 days — automated nudge sent, logged to dashboard' },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Three layers. One system.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Most automation tools are either too rigid (canned workflows) or too expensive (AI on every trigger).
            Autumn8 uses a layered approach: direct API automation for speed, AI for intelligence, humans for judgment.
          </p>
        </div>
      </section>

      {/* Three Layers */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
                >
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                      <Icon size={14} />
                      {layer.label}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy-dark mb-2">{layer.title}</h2>
                    <p className="text-accent font-medium text-sm mb-4">{layer.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{layer.description}</p>
                  </div>
                  <div className={`bg-gray-50 rounded-2xl p-7 border border-gray-100 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Examples</div>
                    <ul className="space-y-3">
                      {layer.examples.map((ex) => (
                        <li key={ex} className="flex items-start gap-3 text-sm text-gray-600">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A day in the life timeline */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Timeline</div>
            <h2 className="text-3xl font-bold text-white">A day in the life of an Autumn8-managed business</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-[88px] top-2 bottom-2 w-px bg-white/10" />

            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-xs font-mono text-white/40">{item.time}</span>
                  </div>
                  <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-accent mt-1 relative z-10" />
                  <p className="text-sm text-white/70 leading-relaxed flex-1">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy-dark mb-4">Ready to see it in action?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Book a free Operations Audit. We&apos;ll walk through exactly what your business needs.
          </p>
          <Link
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-xl transition-all"
          >
            Book Free Audit
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
