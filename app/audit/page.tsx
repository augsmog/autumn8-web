import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { AUDIT_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Your Free Operations Audit | Autumn8',
  description:
    'Schedule your free 30-minute Operations Audit. We\'ll map out the top automation opportunities for your service business — no pitch, no pressure.',
};

const WHAT_TO_EXPECT = [
  'We\'ll review your current lead follow-up process and find the gaps',
  'You\'ll see exactly which automations apply to your business',
  'We\'ll estimate the revenue impact of fixing your response time',
  'No pressure sales pitch — just a useful conversation',
];

const WHO_ITS_FOR = [
  'Pest control, lawn care, or pool service owner-operators',
  'Companies doing $250K–$5M in annual revenue',
  'Businesses frustrated by slow follow-up and missed leads',
  'Operators who want to scale without hiring more admin staff',
];

export default function AuditPage() {
  return (
    <section className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — copy */}
          <div>
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">
              Free Operations Audit
            </div>
            <h1 className="text-4xl font-bold text-navy-dark mb-5 leading-tight">
              30 minutes. A clear picture of what&apos;s leaking.
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Most service businesses lose 20–40% of potential revenue to slow follow-up,
              missed reviews, and inconsistent billing. The audit shows you exactly where
              your business stands — and what fixing it would mean financially.
            </p>

            <div className="mb-8">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                What we cover
              </div>
              <ul className="space-y-3">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      <Check size={11} className="text-accent" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                This is for you if
              </div>
              <ul className="space-y-3">
                {WHO_ITS_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 p-5 bg-navy-dark rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  Founders Pricing
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                We&apos;re in our founding cohort. Early clients lock in pricing for life. Once our 10 founding spots
                fill, pricing increases. Book now to lock in the lowest rate we&apos;ll ever offer.
              </p>
            </div>
          </div>

          {/* Right — calendar embed */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-bold text-navy-dark text-lg">Schedule Your Audit</h2>
              <p className="text-sm text-gray-500 mt-1">Pick a time that works for you — 30 minutes.</p>
            </div>
            <div className="p-4">
              {/* GHL Calendar Embed */}
              <iframe
                src={AUDIT_URL}
                style={{ width: '100%', height: '600px', border: 'none' }}
                title="Book Your Free Operations Audit"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
