import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AUDIT_URL, SEGMENTS } from '@/lib/constants';
import CTABanner from '@/components/cta-banner';

export const metadata: Metadata = {
  title: 'Who We Serve | Autumn8',
  description:
    'Autumn8 works with field service companies, home service businesses, and PE-backed rollups. If you dispatch technicians and invoice after the job, we automate the rest.',
};

const VERTICALS = [
  'Pest Control',
  'Lawn Care',
  'Pool Service',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Cleaning Services',
  'Landscaping',
  'Painting',
  'Handyman',
  'Roofing',
  'Garage Door',
  '...and more',
];

const PE_BENEFITS = [
  {
    title: 'Standardized Operations Across Every Location',
    description:
      "When you acquire a new company, it comes with its own ad-hoc workflows — or none at all. Autumn8 installs the same proven automation stack at every location in 5 days, giving your portfolio a consistent operating baseline from day one.",
  },
  {
    title: 'Portfolio-Level Visibility',
    description:
      'Our Scale plan includes consolidated reporting across all locations. Lead volume, conversion rates, review scores, and revenue trends — visible across your entire portfolio in one dashboard.',
  },
  {
    title: 'Revenue Uplift on Every Acquisition',
    description:
      'Most acquisitions immediately leak revenue through slow lead response and inconsistent billing. Automating these two processes alone typically recovers 15–25% of previously lost revenue within 90 days.',
  },
  {
    title: 'Exit Multiple Expansion',
    description:
      'Buyers pay higher multiples for businesses with documented, automated operations. Autumn8 gives your portfolio companies the operating infrastructure that makes due diligence cleaner and exit stories more compelling.',
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Who We Serve
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Built for any service business.
            <br />
            <span className="text-accent">Especially the ones scaling fast.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            If you dispatch technicians, schedule recurring services, and invoice after the job —
            Autumn8 handles the entire operations layer between the work and the money.
          </p>
          <Link
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-xl transition-all"
          >
            Book a Free Operations Audit
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Segments */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-dark">Three types of clients. One platform.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SEGMENTS.map((s) => (
              <div
                key={s.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-bold text-navy-dark mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals list */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Verticals We Work With
          </div>
          <h2 className="text-2xl font-bold text-navy-dark mb-8">
            We speak your industry&apos;s language.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {VERTICALS.map((v) => (
              <span
                key={v}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  v === '...and more'
                    ? 'border-dashed border-gray-300 text-gray-400 italic'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {v}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6 max-w-lg mx-auto">
            Not seeing your vertical? If you schedule jobs and invoice after completion,{' '}
            <Link href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              let&apos;s talk
            </Link>{' '}
            — we likely have automations that fit.
          </p>
        </div>
      </section>

      {/* PE Rollup Section */}
      <section className="py-24 bg-navy-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                For PE Groups & Rollups
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                The automation layer your portfolio companies are missing.
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Private equity consolidation is reshaping the home services market. The groups winning
                aren&apos;t just acquiring better businesses — they&apos;re installing better operating
                infrastructure. Autumn8 is that infrastructure.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Most acquired service businesses run on gut instinct, Excel, and voicemail. We replace
                that with automated, measurable operations in 5 days — then manage it ongoing so your
                portfolio doesn&apos;t need a separate ops team.
              </p>
              <Link
                href={AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
              >
                Talk to Us About Portfolio Onboarding
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="space-y-5">
              {PE_BENEFITS.map((b) => (
                <div key={b.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <Check size={11} className="text-accent" />
                    </span>
                    <div>
                      <h3 className="font-bold text-white mb-1.5 text-sm">{b.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
