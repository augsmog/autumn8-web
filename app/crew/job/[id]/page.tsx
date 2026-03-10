'use client';

/**
 * /crew/job/[id] — Job detail page.
 * Shows customer info, service history, property notes, gate code, prior findings.
 * Crew member taps the job card on /crew/today to get here.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

interface PropertyNote {
  insight: string;
  date: string;
}

interface JobDetail {
  id: number;
  token: string;
  contactName: string;
  contactPhone: string | null;
  address: string;
  serviceType: string;
  scheduledAt: string;
  status: string;
  notes: string | null;
  issuesFound: string | null;
  gateCode: string | null;
  crewMemberName: string;
  clientName: string;
  propertyNotes: PropertyNote[];
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
}

function navUrl(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/crew/job/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setJob)
      .catch(() => setError('Could not load job details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={s.loading}><div style={s.spinner} /></div>;
  if (error) return <div style={s.errorBox}>{error}</div>;
  if (!job) return null;

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <Link href="/crew/today" style={s.back}>← Back</Link>
        <h1 style={s.customerName}>{job.contactName}</h1>
        <p style={s.service}>{job.serviceType} · {formatDate(job.scheduledAt)}</p>
      </div>

      <div style={s.body}>
        {/* Address + Nav */}
        <div style={s.section}>
          <p style={s.address}>{job.address}</p>
          <a href={navUrl(job.address)} style={s.navBtn} target="_blank" rel="noreferrer">
            🗺 Open in Maps
          </a>
        </div>

        {/* Gate code */}
        {job.gateCode && (
          <div style={s.card}>
            <p style={s.cardLabel}>Gate Code</p>
            <p style={s.gateCode}>{job.gateCode}</p>
          </div>
        )}

        {/* Contact phone */}
        {job.contactPhone && (
          <div style={s.card}>
            <p style={s.cardLabel}>Customer Phone</p>
            <a href={`tel:${job.contactPhone}`} style={s.phoneLink}>{job.contactPhone}</a>
          </div>
        )}

        {/* Property notes */}
        {job.propertyNotes.length > 0 && (
          <div style={s.card}>
            <p style={s.cardLabel}>Property Notes</p>
            {job.propertyNotes.map((n, i) => (
              <div key={i} style={s.noteItem}>
                <p style={s.noteText}>{n.insight}</p>
                <p style={s.noteDate}>{new Date(n.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Prior findings from last visit */}
        {job.issuesFound && (
          <div style={{ ...s.card, borderLeft: '3px solid #f97316' }}>
            <p style={s.cardLabel}>⚠️ Prior Issues Found</p>
            <p style={s.noteText}>{job.issuesFound}</p>
          </div>
        )}

        {/* Actions */}
        <div style={s.actions}>
          {job.status !== 'completed' && job.token && (
            <a
              href={`${OPS_API.replace('ops.', 'app.')}/job-complete/${job.token}`}
              style={s.completeBtn}
            >
              Mark Complete ✓
            </a>
          )}
          <Link href={`/crew/job/${id}/photos`} style={s.actionBtn}>
            📷 Add Photos
          </Link>
          <Link href={`/crew/job/${id}/signature`} style={s.actionBtn}>
            ✍️ Capture Signature
          </Link>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { background: '#f9fafb', minHeight: '100dvh' },
  header: { background: '#f97316', padding: '20px 16px', color: '#fff' },
  back: { display: 'inline-block', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px', marginBottom: '12px' },
  customerName: { margin: '0 0 4px', fontSize: '24px', fontWeight: '800' },
  service: { margin: 0, fontSize: '14px', opacity: 0.9 },
  body: { padding: '16px 12px' },
  section: { background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  address: { margin: '0 0 12px', fontSize: '16px', fontWeight: '600', color: '#111827', lineHeight: 1.4 },
  navBtn: { display: 'inline-block', padding: '10px 20px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  card: { background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  cardLabel: { margin: '0 0 8px', fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  gateCode: { margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827', letterSpacing: '0.15em', fontFamily: 'monospace' },
  phoneLink: { fontSize: '18px', fontWeight: '600', color: '#f97316', textDecoration: 'none' },
  noteItem: { marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' },
  noteText: { margin: '0 0 4px', fontSize: '14px', color: '#374151', lineHeight: 1.5 },
  noteDate: { margin: 0, fontSize: '11px', color: '#9ca3af' },
  actions: { display: 'flex', flexDirection: 'column' as const, gap: '10px', marginTop: '8px' },
  completeBtn: { display: 'block', padding: '16px', background: '#166534', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', fontWeight: '700', textAlign: 'center' as const },
  actionBtn: { display: 'block', padding: '14px', background: '#fff', color: '#374151', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: '600', textAlign: 'center' as const, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' },
  spinner: { width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  errorBox: { margin: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '14px' },
};
