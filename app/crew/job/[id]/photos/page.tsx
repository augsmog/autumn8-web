'use client';

/**
 * /crew/job/[id]/photos — Photo capture and upload for a job.
 * Uses <input type="file" capture="environment"> to open native camera.
 * Uploads to Backblaze B2 via ops API. Shows uploaded thumbnails.
 */

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

interface Photo {
  url: string;
  uploadedAt: string;
}

export default function PhotosPage() {
  const params = useParams();
  const id = params?.id as string;
  const fileRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${OPS_API}/api/crew/job/${id}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'image/jpeg' },
        body: file,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setPhotos(prev => [...prev, { url: data.photoUrl, uploadedAt: new Date().toISOString() }]);
      setSuccess('Photo uploaded!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <Link href={`/crew/job/${id}`} style={s.back}>← Back to Job</Link>
        <h1 style={s.title}>Add Photos</h1>
        <p style={s.subtitle}>Document before/after conditions</p>
      </div>

      <div style={s.body}>
        {/* Upload button */}
        <div style={s.uploadSection}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{ ...s.cameraBtn, opacity: uploading ? 0.6 : 1 }}
          >
            {uploading ? '⏳ Uploading…' : '📷 Take Photo'}
          </button>

          {error && <p style={s.error}>{error}</p>}
          {success && <p style={s.successMsg}>{success}</p>}
        </div>

        {/* Also allow gallery selection */}
        <div style={s.gallerySection}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={s.galleryInput}
          />
          <p style={s.galleryLabel}>Or choose from gallery</p>
        </div>

        {/* Uploaded photos */}
        {photos.length > 0 && (
          <div style={s.photoGrid}>
            <p style={s.gridLabel}>{photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded</p>
            <div style={s.grid}>
              {photos.map((p, i) => (
                <div key={i} style={s.thumb}>
                  <img
                    src={p.url}
                    alt={`Job photo ${i + 1}`}
                    style={s.thumbImg}
                  />
                  <p style={s.thumbTime}>
                    {new Date(p.uploadedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {photos.length === 0 && !uploading && (
          <div style={s.emptyState}>
            <p style={s.emptyIcon}>📸</p>
            <p style={s.emptyText}>No photos yet. Tap the button above to take your first photo.</p>
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
  body: { padding: '16px 12px' },
  uploadSection: { background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' as const },
  cameraBtn: { width: '100%', padding: '18px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer' },
  error: { color: '#dc2626', fontSize: '14px', marginTop: '12px' },
  successMsg: { color: '#166534', fontSize: '14px', marginTop: '12px', fontWeight: '600' },
  gallerySection: { background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' as const },
  galleryInput: { fontSize: '14px', color: '#6b7280' },
  galleryLabel: { margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' },
  photoGrid: { background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  gridLabel: { margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#6b7280' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  thumb: { textAlign: 'center' as const },
  thumbImg: { width: '100%', aspectRatio: '1', objectFit: 'cover' as const, borderRadius: '8px', border: '1px solid #e5e7eb' },
  thumbTime: { margin: '4px 0 0', fontSize: '11px', color: '#9ca3af' },
  emptyState: { textAlign: 'center' as const, padding: '48px 24px' },
  emptyIcon: { fontSize: '48px', margin: '0 0 12px' },
  emptyText: { fontSize: '14px', color: '#9ca3af', lineHeight: 1.5, margin: 0 },
};
