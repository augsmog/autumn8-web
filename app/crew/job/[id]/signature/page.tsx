'use client';

/**
 * /crew/job/[id]/signature — Digital signature capture.
 * Touch/mouse canvas. Customer signs on tech's phone to confirm service.
 * Stores as PNG URL in job_completions via ops API.
 */

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

export default function SignaturePage() {
  const params = useParams();
  const id = params?.id as string;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  function getPos(e: React.TouchEvent | React.MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  }

  function startDraw(e: React.TouchEvent | React.MouseEvent) {
    e.preventDefault();
    isDrawing.current = true;
    const canvas = canvasRef.current!;
    lastPos.current = getPos(e, canvas);
    setIsEmpty(false);
  }

  function draw(e: React.TouchEvent | React.MouseEvent) {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  }

  function stopDraw() {
    isDrawing.current = false;
    lastPos.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  }

  async function submit() {
    if (isEmpty) return;
    const canvas = canvasRef.current!;
    const dataUrl = canvas.toDataURL('image/png');

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${OPS_API}/api/crew/job/${id}/signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signatureDataUrl: dataUrl }),
      });

      if (!res.ok) throw new Error('Failed to save signature');
      setSubmitted(true);
    } catch {
      setError('Could not save signature. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.successPage}>
          <div style={s.successIcon}>✅</div>
          <h2 style={s.successTitle}>Signature Captured</h2>
          <p style={s.successText}>The customer's signature has been saved to this job record.</p>
          <Link href={`/crew/job/${id}`} style={s.backBtn}>Back to Job</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <Link href={`/crew/job/${id}`} style={s.back}>← Back to Job</Link>
        <h1 style={s.title}>Customer Signature</h1>
        <p style={s.subtitle}>Have the customer sign to confirm service completion</p>
      </div>

      <div style={s.body}>
        <div style={s.canvasWrapper}>
          <p style={s.signHere}>Sign here ↓</p>
          <canvas
            ref={canvasRef}
            style={s.canvas}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          {isEmpty && (
            <div style={s.placeholder}>Customer signature</div>
          )}
        </div>

        {error && <p style={s.error}>{error}</p>}

        <div style={s.actions}>
          <button onClick={clearCanvas} style={s.clearBtn} disabled={isEmpty}>
            Clear
          </button>
          <button
            onClick={submit}
            disabled={isEmpty || submitting}
            style={{ ...s.submitBtn, opacity: isEmpty || submitting ? 0.5 : 1 }}
          >
            {submitting ? 'Saving…' : 'Save Signature'}
          </button>
        </div>
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
  canvasWrapper: { background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'relative' as const },
  signHere: { margin: '0 0 8px', fontSize: '12px', color: '#9ca3af', fontWeight: '600' },
  canvas: { width: '100%', height: '200px', border: '2px dashed #e5e7eb', borderRadius: '8px', cursor: 'crosshair', display: 'block', touchAction: 'none' },
  placeholder: { position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#d1d5db', fontSize: '16px', pointerEvents: 'none' as const, marginTop: '16px' },
  error: { color: '#dc2626', fontSize: '14px', marginBottom: '12px' },
  actions: { display: 'flex', gap: '10px' },
  clearBtn: { flex: 1, padding: '14px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  submitBtn: { flex: 2, padding: '14px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
  successPage: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '80dvh', padding: '24px', textAlign: 'center' as const },
  successIcon: { fontSize: '64px', marginBottom: '16px' },
  successTitle: { fontSize: '24px', fontWeight: '700', margin: '0 0 12px', color: '#111827' },
  successText: { fontSize: '16px', color: '#6b7280', lineHeight: 1.5, margin: '0 0 24px' },
  backBtn: { padding: '14px 28px', background: '#f97316', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: '700' },
};
