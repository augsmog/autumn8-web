'use client';

/**
 * /crew/today — Today's schedule for a crew member.
 * Loaded from the morning briefing SMS link: /crew/today?t=TOKEN
 *
 * Shows all jobs in optimized route order with:
 * - Job status (scheduled/completed)
 * - Customer name, address, service type
 * - Navigation link (opens Google Maps / Apple Maps)
 * - Link to job completion form
 * - Link to job detail page
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

interface Job {
  id: number;
  token: string;
  contactName: string;
  address: string;
  serviceType: string;
  scheduledAt: string;
  status: string;
  clientName: string;
}

interface ScheduleData {
  crewMember: { id: number; name: string };
  jobs: Job[];
  date: string;
}

function formatTime(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function navUrl(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'completed') {
    return <span style={badge.done}>✓ Done</span>;
  }
  return <span style={badge.scheduled}>Scheduled</span>;
}

const badge: Record<string, React.CSSProperties> = {
  done: { background: '#dcfce7', color: '#166534', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' },
  scheduled: { background: '#fef3c7', color: '#92400e', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' },
};

export default function TodayPage() {
  const [data, setData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/crew/schedule')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setData)
      .catch(() => setError('Could not load your schedule. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={s.center}>
        <div style={s.spinner} />
        <p style={s.loadingText}>Loading your schedule…</p>
      </div>
    );
  }

  if (error) {
    return <div style={s.errorBox}>{error}</div>;
  }

  const jobs = data?.jobs || [];
  const completed = jobs.filter(j => j.status === 'completed').length;

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div>
            <p style={s.greeting}>Good morning, {data?.crewMember.name?.split(' ')[0]} 👋</p>
            <p style={s.date}>{data?.date}</p>
          </div>
          <div style={s.progress}>
            <span style={s.progressNum}>{completed}/{jobs.length}</span>
            <span style={s.progressLabel}>done</span>
          </div>
        </div>
      </div>

      {/* Job list */}
      <div style={s.list}>
        {jobs.length === 0 && (
          <div style={s.emptyState}>
            <p style={s.emptyTitle}>No jobs scheduled today</p>
            <p style={s.emptyText}>Check back tomorrow or contact the office.</p>
          </div>
        )}

        {jobs.map((job, idx) => (
          <div key={job.id} style={{ ...s.card, opacity: job.status === 'completed' ? 0.7 : 1 }}>
            <div style={s.cardTop}>
              <div style={s.stopNum}>{idx + 1}</div>
              <div style={s.cardInfo}>
                <div style={s.cardHeader}>
                  <span style={s.customerName}>{job.contactName}</span>
                  <StatusBadge status={job.status} />
                </div>
                <p style={s.address}>{job.address}</p>
                <p style={s.service}>{job.serviceType} · {formatTime(job.scheduledAt)}</p>
              </div>
            </div>

            <div style={s.cardActions}>
              <a href={navUrl(job.address)} style={s.navBtn} target="_blank" rel="noreferrer">
                🗺 Navigate
              </a>
              <Link href={`/crew/job/${job.id}`} style={s.detailBtn}>
                Details
              </Link>
              {job.status !== 'completed' && job.token && (
                <a
                  href={`${OPS_API.replace('ops.', 'app.')}/job-complete/${job.token}`}
                  style={s.completeBtn}
                >
                  Complete ✓
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Route map link */}
      {jobs.length > 0 && (
        <div style={s.routeLink}>
          <Link href="/crew/route" style={s.routeBtn}>
            📍 View Route Map
          </Link>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { background: '#f9fafb', minHeight: '100dvh' },
  header: { background: '#f97316', padding: '24px 16px 20px', color: '#fff' },
  headerInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { margin: 0, fontSize: '20px', fontWeight: '700' },
  date: { margin: '4px 0 0', fontSize: '14px', opacity: 0.85 },
  progress: { textAlign: 'right' as const },
  progressNum: { display: 'block', fontSize: '28px', fontWeight: '800', lineHeight: 1 },
  progressLabel: { fontSize: '12px', opacity: 0.8 },
  list: { padding: '12px 12px 24px' },
  card: { background: '#fff', borderRadius: '12px', marginBottom: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  cardTop: { display: 'flex', gap: '12px', marginBottom: '12px' },
  stopNum: { width: '28px', height: '28px', borderRadius: '50%', background: '#f97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 },
  cardInfo: { flex: 1 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  customerName: { fontWeight: '700', fontSize: '16px', color: '#111827' },
  address: { margin: '0 0 2px', fontSize: '13px', color: '#6b7280' },
  service: { margin: 0, fontSize: '13px', color: '#9ca3af' },
  cardActions: { display: 'flex', gap: '8px', flexWrap: 'wrap' as const },
  navBtn: { padding: '8px 14px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' },
  detailBtn: { padding: '8px 14px', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' },
  completeBtn: { padding: '8px 14px', background: '#f0fdf4', color: '#166534', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' },
  routeLink: { padding: '0 12px 24px', textAlign: 'center' as const },
  routeBtn: { display: 'inline-block', padding: '12px 24px', background: '#1f2937', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '600' },
  center: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '12px' },
  spinner: { width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadingText: { color: '#6b7280', fontSize: '14px', margin: 0 },
  errorBox: { margin: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '14px' },
  emptyState: { textAlign: 'center' as const, padding: '48px 24px' },
  emptyTitle: { fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0 0 8px' },
  emptyText: { fontSize: '14px', color: '#9ca3af', margin: 0 },
};
