'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

interface SetupStatus {
  gbp: boolean;
  jobber: boolean;
  quickbooks: boolean;
  yelp: boolean;
  angi: boolean;
  contactsImported: boolean;
  socialConnected: boolean;
}

const SETUP_STEPS = [
  {
    key: 'gbp' as keyof SetupStatus,
    label: 'Connect Google Business Profile',
    description: 'Enables automatic review response posting on Google.',
    href: null as ((l: string) => string) | null,
    linkLabel: 'Connect in GHL dashboard',
    alwaysShow: true,
  },
  {
    key: 'jobber' as keyof SetupStatus,
    label: 'Import your Jobber customer list',
    description: 'Pulls your existing customers so automations have someone to contact from Day 1.',
    href: (l: string) => `${OPS_API}/api/import/jobber/connect?locationId=${l}`,
    linkLabel: 'Connect Jobber',
    alwaysShow: false,
  },
  {
    key: 'contactsImported' as keyof SetupStatus,
    label: 'Import your customer list (CSV)',
    description: 'Upload a CSV export from your current scheduling software.',
    href: null as ((l: string) => string) | null,
    linkLabel: 'Upload CSV in your dashboard',
    alwaysShow: false,
  },
  {
    key: 'quickbooks' as keyof SetupStatus,
    label: 'Connect QuickBooks',
    description: 'Imports invoice history so your revenue reports start with real numbers.',
    href: (l: string) => `${OPS_API}/api/import/quickbooks/connect?locationId=${l}`,
    linkLabel: 'Connect QuickBooks',
    alwaysShow: false,
  },
  {
    key: 'yelp' as keyof SetupStatus,
    label: 'Link your Yelp page',
    description: "We'll monitor your Yelp reviews and draft responses automatically.",
    href: null as ((l: string) => string) | null,
    linkLabel: 'Confirm Yelp listing in your dashboard',
    alwaysShow: false,
  },
  {
    key: 'angi' as keyof SetupStatus,
    label: 'Confirm your Angi profile',
    description: 'Your Angi URL is saved so the team can monitor and respond to reviews.',
    href: null as ((l: string) => string) | null,
    linkLabel: null,
    alwaysShow: false,
  },
  {
    key: 'socialConnected' as keyof SetupStatus,
    label: 'Connect Facebook & Instagram in GHL',
    description: 'Enables automated social media posts through your GHL dashboard.',
    href: null as ((l: string) => string) | null,
    linkLabel: 'Connect social in GHL',
    alwaysShow: true,
  },
];

function CheckIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-orange-300 bg-orange-50 flex items-center justify-center">
      <span className="w-2 h-2 rounded-full bg-orange-400" />
    </span>
  );
}

function ConnectToolsChecklist({
  locationId,
  hasJobber,
  hasQB,
  hasYelp,
  hasAngi,
}: {
  locationId: string;
  hasJobber: boolean;
  hasQB: boolean;
  hasYelp: boolean;
  hasAngi: boolean;
}) {
  const [status, setStatus] = useState<SetupStatus | null>(null);

  useEffect(() => {
    if (!locationId) return;
    fetch(`${OPS_API}/api/import/client-setup-status?locationId=${encodeURIComponent(locationId)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setStatus(data); })
      .catch(() => {});
  }, [locationId]);

  const visibleSteps = SETUP_STEPS.filter((step) => {
    if (step.alwaysShow) return true;
    if (step.key === 'jobber') return hasJobber;
    if (step.key === 'contactsImported') return !hasJobber && !(status?.contactsImported);
    if (step.key === 'quickbooks') return hasQB;
    if (step.key === 'yelp') return hasYelp;
    if (step.key === 'angi') return hasAngi;
    return false;
  });

  const completedCount = visibleSteps.filter((s) => status?.[s.key]).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-text-primary">Connect your tools</p>
        {status && (
          <span className="text-xs text-text-muted">{completedCount}/{visibleSteps.length} connected</span>
        )}
      </div>
      <div className="space-y-3">
        {visibleSteps.map((step) => {
          const done = !!(status?.[step.key]);
          const href = step.href ? step.href(locationId) : null;
          return (
            <div
              key={step.key}
              className={`flex items-start gap-3 p-3 rounded-xl border ${done ? 'bg-green-50 border-green-200' : 'bg-background border-border'}`}
            >
              <CheckIcon done={done} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${done ? 'text-green-800 line-through decoration-green-400' : 'text-text-primary'}`}>
                  {step.label}
                </p>
                {!done && <p className="text-xs text-text-muted mt-0.5">{step.description}</p>}
                {!done && href && step.linkLabel && (
                  <a href={href} className="inline-block mt-1.5 text-xs font-semibold text-brand-orange hover:underline">
                    {step.linkLabel} →
                  </a>
                )}
                {!done && !href && step.linkLabel && (
                  <p className="mt-1 text-xs text-text-muted">{step.linkLabel}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {status && completedCount === visibleSteps.length && (
        <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-xl text-center">
          <p className="text-sm font-semibold text-green-800">All connections complete — you&apos;re fully set up!</p>
        </div>
      )}
    </div>
  );
}

function WelcomeContent() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId') || searchParams.get('ghl_location_id') || '';
  const hasJobber = searchParams.get('hasJobber') === '1';
  const hasQB     = searchParams.get('hasQB') === '1';
  const hasYelp   = searchParams.get('hasYelp') === '1';
  const hasAngi   = searchParams.get('hasAngi') === '1';
  const showChecklist = !!(locationId || hasJobber || hasQB || hasYelp || hasAngi);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Welcome to Autumn8</h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Your automation is being configured. A few quick connections below will get everything running from Day&nbsp;1.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 mb-5">
          <p className="text-sm font-semibold text-text-primary mb-3">What happens next:</p>
          <div className="space-y-2">
            {[
              'Check your email for GHL dashboard access credentials',
              'Automations go live within 24–48 hours',
              'Book your kickoff call — we walk through everything together',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="text-brand-orange font-bold flex-shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {showChecklist && (
          <div className="bg-surface border border-border rounded-xl p-5 mb-5">
            <ConnectToolsChecklist
              locationId={locationId}
              hasJobber={hasJobber}
              hasQB={hasQB}
              hasYelp={hasYelp}
              hasAngi={hasAngi}
            />
          </div>
        )}

        <div className="text-center">
          <p className="text-text-muted text-sm mb-2">
            Questions? Email{' '}
            <a href="mailto:team@autumn8.me" className="text-brand-orange hover:underline">team@autumn8.me</a>
          </p>
          <Link href="/" className="text-text-muted text-xs hover:text-text-secondary transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-muted text-lg">Loading...</div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}
