'use client';

/**
 * /crew/estimate/[id] — Estimate presentation page.
 * The tech shows this to the customer on their phone.
 * Customer can see the formatted estimate and accept/decline.
 *
 * This page is driven by URL params since estimate data isn't always
 * stored in the DB (estimates may live in GHL opportunities).
 * The tech passes estimate details as query params when linking:
 * /crew/estimate/123?amount=280&desc=AC+capacitor+repair&customer=Rodriguez
 */

import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function EstimatePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;

  const amount = searchParams.get('amount') || '0';
  const description = searchParams.get('desc') || 'Service';
  const customer = searchParams.get('customer') || 'Customer';
  const jobId = searchParams.get('jobId') || '';

  const [customerResponse, setCustomerResponse] = useState<'accepted' | 'declined' | null>(null);

  function formatCurrency(val: string): string {
    return `$${parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  if (customerResponse) {
    return (
      <div style={s.page}>
        <div style={s.responsePage}>
          <div style={s.responseIcon}>{customerResponse === 'accepted' ? '✅' : '❌'}</div>
          <h2 style={s.responseTitle}>
            {customerResponse === 'accepted' ? 'Estimate Accepted' : 'Estimate Declined'}
          </h2>
          <p style={s.responseText}>
            {customerResponse === 'accepted'
              ? `${customer} has accepted the estimate. The office will follow up to schedule the work.`
              : `${customer} has declined the estimate. No further action required.`}
          </p>
          {jobId && (
            <Link href={`/crew/job/${jobId}`} style={s.backBtn}>Back to Job</Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Header — visible to customer too */}
      <div style={s.header}>
        <div style={s.logoArea}>
          <span style={s.logo}>🍂</span>
          <span style={s.logoText}>Service Estimate</span>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.estimateCard}>
          <p style={s.preparedFor}>Prepared for</p>
          <h2 style={s.customerName}>{customer}</h2>

          <div style={s.divider} />

          <div style={s.lineItem}>
            <span style={s.lineDesc}>{description}</span>
            <span style={s.lineAmount}>{formatCurrency(amount)}</span>
          </div>

          <div style={s.divider} />

          <div style={s.totalRow}>
            <span style={s.totalLabel}>TOTAL</span>
            <span style={s.totalAmount}>{formatCurrency(amount)}</span>
          </div>
        </div>

        <p style={s.disclaimer}>
          This is an estimate. Final invoice may vary based on actual work completed.
        </p>

        <div style={s.actions}>
          <button
            onClick={() => setCustomerResponse('accepted')}
            style={s.acceptBtn}
          >
            Accept Estimate
          </button>
          <button
            onClick={() => setCustomerResponse('declined')}
            style={s.declineBtn}
          >
            Decline
          </button>
        </div>
      </div>

      {/* Back link for the tech */}
      {jobId && (
        <div style={s.techNav}>
          <Link href={`/crew/job/${jobId}`} style={s.techLink}>← Back to Job (tech only)</Link>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { background: '#f9fafb', minHeight: '100dvh' },
  header: { background: '#1f2937', padding: '20px 16px', color: '#fff' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '24px' },
  logoText: { fontSize: '18px', fontWeight: '700', color: '#f9fafb' },
  body: { padding: '24px 16px' },
  estimateCard: { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: '16px' },
  preparedFor: { margin: '0 0 4px', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  customerName: { margin: '0 0 20px', fontSize: '26px', fontWeight: '800', color: '#111827' },
  divider: { height: '1px', background: '#f3f4f6', margin: '16px 0' },
  lineItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' },
  lineDesc: { fontSize: '16px', color: '#374151', lineHeight: 1.4 },
  lineAmount: { fontSize: '16px', fontWeight: '600', color: '#111827', flexShrink: 0 },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: '13px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.1em' },
  totalAmount: { fontSize: '28px', fontWeight: '800', color: '#f97316' },
  disclaimer: { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, lineHeight: 1.5, marginBottom: '24px' },
  actions: { display: 'flex', flexDirection: 'column' as const, gap: '10px' },
  acceptBtn: { width: '100%', padding: '18px', background: '#166534', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' },
  declineBtn: { width: '100%', padding: '14px', background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  techNav: { padding: '16px', textAlign: 'center' as const, borderTop: '1px solid #e5e7eb' },
  techLink: { fontSize: '13px', color: '#9ca3af', textDecoration: 'none' },
  responsePage: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '80dvh', padding: '24px', textAlign: 'center' as const },
  responseIcon: { fontSize: '64px', marginBottom: '16px' },
  responseTitle: { fontSize: '24px', fontWeight: '700', margin: '0 0 12px', color: '#111827' },
  responseText: { fontSize: '16px', color: '#6b7280', lineHeight: 1.5, margin: '0 0 24px' },
  backBtn: { padding: '14px 28px', background: '#f97316', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: '700' },
};
