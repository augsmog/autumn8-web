import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';
import { AUDIT_URL, SEGMENTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Who We Serve | Autumn8',
  description:
    'Autumn8 helps field service and home service businesses compete with the infrastructure PE-backed competitors already have. Automated lead response, reviews, invoicing — without selling your business.',
};

const VERTICALS = [
  'Pest Control', 'Lawn Care', 'Pool Service', 'HVAC', 'Plumbing',
  'Electrical', 'Cleaning Services', 'Landscaping', 'Painting',
  'Handyman', 'Roofing', 'Garage Door', '...and more',
];

const COMPETE_POINTS = [
  {
    title: 'Respond as fast as the big guys',
    description:
      'PE-backed competitors respond to new leads in under 60 seconds — because they have automated systems to do it. Now you do too. Every inquiry gets an immediate reply, even at 9 PM on a Sunday.',
  },
  {
    title: 'Win the review war',
    description:
      'Corporate-backed operators run systematic review programs after every job. Their 4.8-star rating isn\'t an accident. Autumn8 automates review requests at exactly the right moment, then drafts and posts responses — the same playbook, available to you.',
  },
  {
    title: 'Look bigger than you are',
    description:
      'Professional automated follow-up, reminders, and monthly reporting make a 3-person shop feel like a 20-person operation. Customers can\'t tell the difference. They just notice that you\'re faster, more responsive, and more professional than your competitors.',
  },
  {
    title: 'Keep your business',
    description:
      'PE rollups offer owners capital and infrastructure — but you give up equity, control, and eventually your business. Autumn8 gives you the exact same operational infrastructure for $1,297/month. Keep your business. Just run it better.',
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Who We Serve
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-5 leading-tight tracking-tight">
            Built for any service business.{' '}
            <span className="gradient-text">Especially the ones fighting back.</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            If you dispatch technicians, schedule recurring services, and invoice after the job —
            Autumn8 handles the entire operations layer between the work and the money.
          </p>
          <Link
            href={AUDIT_URL}
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-black font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            Book a Free Operations Audit
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Segments */}
      <section className="py-20 bg-surface/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary">Three types of clients. One platform.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SEGMENTS.map((s) => (
              <div key={s.title} className="bg-surface border border-border rounded-xl p-8 hover:border-brand-orange/30 transition-colors">
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{s.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            Verticals We Work With
          </span>
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            We speak your industry&apos;s language.
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {VERTICALS.map((v) => (
              <span
                key={v}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  v === '...and more'
                    ? 'border-dashed border-border text-text-muted italic'
                    : 'bg-surface border-border text-text-secondary hover:border-brand-orange/40 transition-colors'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Not seeing your vertical? If you schedule jobs and invoice after completion,{' '}
            <Link href={AUDIT_URL} className="text-brand-orange hover:underline">let&apos;s talk</Link>{' '}
            — we likely have automations that fit.
          </p>
        </div>
      </section>

      {/* The real PE angle — competing against rollups */}
      <section className="py-24 bg-surface/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <TrendingUp size={12} />
                The Playing Field Just Got Uneven
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-5 leading-tight">
                PE rollups are in your market. They came with a playbook.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Private equity is consolidating pest control, lawn care, and pool service companies
                across the country. When they acquire a business, they don&apos;t just bring capital —
                they bring automated lead response, professional scheduling, review management,
                and monthly reporting built on enterprise infrastructure.
              </p>
              <p className="text-text-secondary leading-relaxed mb-5">
                That rollup in your market responds to every lead in 60 seconds. Their Google rating
                climbs every month. Their customers get reminders, follow-ups, and invoices like
                clockwork. And they&apos;re taking calls that should be yours.
              </p>
              <p className="text-text-primary font-semibold leading-relaxed mb-8">
                Autumn8 is how independent operators get that same infrastructure — without
                giving up their business to get it.
              </p>
              <Link
                href={AUDIT_URL}
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-black font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-105 text-sm"
              >
                Level the Playing Field
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right — the 4 advantages */}
            <div className="space-y-4">
              {COMPETE_POINTS.map((p) => (
                <div key={p.title} className="bg-surface border border-border hover:border-brand-orange/25 rounded-xl p-6 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-orange/15 flex items-center justify-center mt-0.5">
                      <Check size={11} className="text-brand-orange" />
                    </span>
                    <div>
                      <h3 className="font-bold text-text-primary mb-1.5 text-sm">{p.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Stop competing at a disadvantage.
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Book a free audit and we&apos;ll show you exactly where your operations are falling
            short — and what it would take to close the gap.
          </p>
          <Link
            href={AUDIT_URL}
            className="cta-glow inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            Get Your Free Operations Audit
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
