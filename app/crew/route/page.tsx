'use client';

/**
 * /crew/route — Today's optimized route on an interactive map.
 * Uses OpenStreetMap (zero dependencies, no API key required).
 * Each stop shows number, address, and a "Navigate" link.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  token: string;
  contactName: string;
  address: string;
  serviceType: string;
  scheduledAt: string;
  status: string;
}

function formatTime(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function navUrl(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

// Build an OpenStreetMap URL with markers for all stops
function buildMapUrl(jobs: Job[]): string {
  if (jobs.length === 0) return 'https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik';

  // Use the first job's address as the map center (approximate — geocoding would improve this)
  const firstAddr = encodeURIComponent(jobs[0].address);
  return `https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=${firstAddr}`;
}

export default function RoutePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/crew/schedule')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setJobs(data.jobs || []))
      .catch(() => setError('Could not load route.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.loading}><div style={s.spinner} /></div>;
  if (error) return <div style={s.errorBox}>{error}</div>;

  // Build a multi-stop Google Maps URL for navigation
  const gmapsRouteUrl = jobs.length > 0
    ? `https://maps.google.com/maps/dir/${jobs.map(j => encodeURIComponent(j.address)).join('/')}`
    : null;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <Link href="/crew/today" style={s.back}>← Schedule</Link>
        <h1 style={s.title}>Today's Route</h1>
        <p style={s.subtitle}>{jobs.length} stop{jobs.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Map embed */}
      {jobs.length > 0 && (
        <div style={s.mapWrapper}>
          <iframe
            title="Route Map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik`}
            style={s.mapIframe}
            frameBorder="0"
            scrolling="no"
          />
          {gmapsRouteUrl && (
            <a href={gmapsRouteUrl} style={s.fullRouteBtn} target="_blank" rel="noreferrer">
              🗺 Open Full Route in Google Maps
            </a>
          )}
        </div>
      )}

      {/* Stop list */}
      <div style={s.stopList}>
        {jobs.map((job, idx) => (
          <div
            key={job.id}
            style={{ ...s.stopCard, opacity: job.status === 'completed' ? 0.6 : 1 }}
          >
            <div style={s.stopNum}>{idx + 1}</div>
            <div style={s.stopInfo}>
              <p style={s.stopName}>{job.contactName}</p>
              <p style={s.stopAddress}>{job.address}</p>
              <p style={s.stopMeta}>{job.serviceType} · {formatTime(job.scheduledAt)}</p>
            </div>
            <div style={s.stopActions}>
              {job.status === 'completed'
                ? <span style={s.doneBadge}>✓</span>
                : <a href={navUrl(job.address)} style={s.navBtn} target="_blank" rel="noreferrer">Go</a>
              }
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div style={s.emptyState}>
            <p style={s.emptyText}>No stops scheduled today.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { background: '#f9fafb', minHeight: '100dvh' },
  header: { background: '#f97316', padding: '20px 16px', color: '#fff' },
  back: { display: 'inline-block', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px', marginBottom: '12px' },
  title: { margin: '0 0 4px', fontSize: '24px', fontWeight: '800' },
  subtitle: { margin: 0, fontSize: '14px', opacity: 0.9 },
  mapWrapper: { position: 'relative' as const },
  mapIframe: { width: '100%', height: '220px', border: 'none', display: 'block' },
  fullRouteBtn: { display: 'block', padding: '12px 16px', background: '#1d4ed8', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', textAlign: 'center' as const },
  stopList: { padding: '12px' },
  stopCard: { background: '#fff', borderRadius: '12px', padding: '14px', marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '12px' },
  stopNum: { width: '28px', height: '28px', borderRadius: '50%', background: '#f97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', flexShrink: 0 },
  stopInfo: { flex: 1 },
  stopName: { margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: '#111827' },
  stopAddress: { margin: '0 0 2px', fontSize: '13px', color: '#6b7280' },
  stopMeta: { margin: 0, fontSize: '12px', color: '#9ca3af' },
  stopActions: { flexShrink: 0 },
  navBtn: { padding: '8px 16px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '700' },
  doneBadge: { display: 'inline-block', width: '28px', height: '28px', borderRadius: '50%', background: '#dcfce7', color: '#166534', textAlign: 'center' as const, lineHeight: '28px', fontWeight: '700' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' },
  spinner: { width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  errorBox: { margin: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '14px' },
  emptyState: { textAlign: 'center' as const, padding: '48px 24px' },
  emptyText: { fontSize: '14px', color: '#9ca3af', margin: 0 },
};
