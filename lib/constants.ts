export const AUDIT_URL = 'https://api.leadconnectorhq.com/widget/booking/autumn8-audit'; // replace with real GHL calendar link
export const CLIENT_LOGIN_URL = 'https://app.autumn8.me'; // GHL white-label portal

export const PRICING_TIERS = [
  {
    name: 'Foundation',
    price: 1297,
    description: 'Everything you need to stop losing leads and automate the basics.',
    features: [
      'Speed-to-lead SMS (under 5 minutes)',
      'Appointment reminder sequences',
      'Invoice follow-up automation',
      'Review request automation',
      'Monthly performance report',
      'Up to 3 active workflows',
      'Email support',
    ],
    cta: 'Start with Foundation',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 1997,
    description: 'Full automation stack with AI-powered responses and weekly insights.',
    features: [
      'Everything in Foundation',
      'AI review responses (auto-posted)',
      'Weekly performance summaries',
      'Anomaly detection & alerts',
      'Missed call text-back',
      'Up to 8 active workflows',
      'Priority support + monthly call',
    ],
    cta: 'Start with Growth',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Scale',
    price: 2997,
    description: 'For multi-location operators and PE-backed rollups who need portfolio-wide automation.',
    features: [
      'Everything in Growth',
      'Multi-location support',
      'Custom automation roadmap',
      'Quarterly strategy call',
      'Portfolio-level reporting',
      'Unlimited active workflows',
      'Dedicated account manager',
    ],
    cta: 'Start with Scale',
    highlighted: false,
  },
];

export const SEGMENTS = [
  {
    icon: '🔧',
    title: 'Field Service Operators',
    description:
      'Any business that dispatches technicians — HVAC, plumbing, electrical, pest control, cleaning, and more. If you schedule jobs and invoice after completion, Autumn8 runs the admin layer.',
  },
  {
    icon: '🏠',
    title: 'Home Service Companies',
    description:
      'High-frequency recurring businesses — lawn care, pool service, window cleaning, landscaping. Where customer retention and review scores drive everything.',
  },
  {
    icon: '🏢',
    title: 'PE-Backed Rollups',
    description:
      'Private equity groups acquiring service businesses need consistent operating infrastructure across every location. Autumn8 is the automation layer that makes rollup integration fast and standardized.',
  },
];

export const STATS = [
  { value: '17 min', label: 'Average time from new lead to confirmed appointment' },
  { value: '62%', label: 'Of calls to service businesses go unanswered' },
  { value: '4.8★', label: 'Average review score for Autumn8-managed clients' },
  { value: '3 hrs', label: 'Saved per day on admin and follow-up tasks' },
];

export const AUTOMATIONS = [
  {
    icon: '⚡',
    title: 'Speed-to-Lead',
    description: 'New form or call inquiry → SMS reply within 5 minutes, every time.',
  },
  {
    icon: '📅',
    title: 'Appointment Reminders',
    description: '24-hour and 2-hour reminders cut no-shows by 40%.',
  },
  {
    icon: '💵',
    title: 'Invoice Follow-Up',
    description: 'Overdue invoices get automated nudges before they become problems.',
  },
  {
    icon: '⭐',
    title: 'Review Requests',
    description: 'Every completed job triggers a review request at the perfect moment.',
  },
  {
    icon: '🤖',
    title: 'Review Responses',
    description: 'AI drafts and posts responses to Google reviews within the hour.',
  },
  {
    icon: '📊',
    title: 'Monthly Reports',
    description: 'Full performance report delivered on the 1st — no manual work.',
  },
];

export const FAQ = [
  {
    question: 'What types of businesses do you work with?',
    answer:
      'Any field service or home service business with recurring customers and scheduled appointments. We work well with companies doing $300K–$10M in annual revenue — from solo operators to PE-backed rollups managing multiple locations.',
  },
  {
    question: 'Do I need to change my existing software?',
    answer:
      'No. We integrate with your current tools — GoHighLevel, Google, Stripe, and more. You keep your workflows; we automate the gaps.',
  },
  {
    question: 'How long does onboarding take?',
    answer:
      'Most clients are fully live within 5 business days. We handle the setup — you just answer a few questions about your business on an onboarding call.',
  },
  {
    question: 'What does the monthly report include?',
    answer:
      'Lead volume, conversion rate, review score, response time benchmarks, revenue collected, and a plain-English summary of what happened and what to watch.',
  },
  {
    question: 'Do you support multi-location and PE rollup operations?',
    answer:
      'Yes. Our Scale plan is purpose-built for multi-location operators and PE-backed rollups. Each location gets its own automations and dashboard, with consolidated reporting at the portfolio level.',
  },
  {
    question: 'Is there a contract?',
    answer:
      "Month-to-month after a 90-day initial commitment. We build the systems in the first 90 days — that's what the commitment covers.",
  },
  {
    question: "What's Founders Pricing?",
    answer:
      "Our first 10 clients lock in their rate for life. We're filling those spots now. Once they're gone, pricing increases as we expand capacity.",
  },
];
