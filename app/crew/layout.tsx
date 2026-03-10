'use client';

/**
 * Crew PWA layout.
 * Handles token-based authentication via SMS links.
 *
 * Flow:
 *   1. SMS link arrives as /crew/today?t=SIGNED_TOKEN
 *   2. Layout calls GET /api/crew/auth?t=TOKEN → sets session cookie
 *   3. Subsequent /crew/* visits use cookie — no repeated token in URL
 *   4. If no token and no cookie: show "Text [number] to get your link"
 *
 * Mobile-first: no navigation header, minimal chrome, dark orange accent.
 */

import { useEffect, useState, ReactNode } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

interface CrewMember {
  id: number;
  name: string;
}

const SYSTEM_NUMBER = process.env.NEXT_PUBLIC_TWILIO_PHONE || 'your system number';

export default function CrewLayout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null); // null = loading
  const [crewMember, setCrewMember] = useState<CrewMember | null>(null);

  useEffect(() => {
    const token = searchParams.get('t');

    async function authenticate() {
      // If token in URL, exchange for cookie
      if (token) {
        try {
          const res = await fetch(`/api/crew/auth?t=${encodeURIComponent(token)}`);
          if (res.ok) {
            const data = await res.json();
            setCrewMember(data.crewMember);
            setAuthed(true);
            return;
          }
        } catch {}
      }

      // Try existing cookie by calling schedule (returns 401 if not authed)
      try {
        const res = await fetch('/api/crew/schedule');
        if (res.ok) {
          const data = await res.json();
          setCrewMember(data.crewMember);
          setAuthed(true);
          return;
        }
      } catch {}

      setAuthed(false);
    }

    authenticate();
  }, [searchParams]);

  if (authed === null) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={styles.unauthPage}>
        <div style={styles.unauthCard}>
          <div style={styles.logo}>🍂</div>
          <h1 style={styles.unauthTitle}>Autumn8 Field</h1>
          <p style={styles.unauthText}>
            Your daily briefing link arrives by text each morning.
          </p>
          <p style={styles.unauthSubtext}>
            Text <strong>{SYSTEM_NUMBER}</strong> to request a new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100dvh',
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  content: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '0 0 80px 0', // bottom padding for thumb reach
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100dvh',
    backgroundColor: '#f9fafb',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#f97316',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  unauthPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100dvh',
    backgroundColor: '#111827',
    padding: '24px',
  },
  unauthCard: {
    textAlign: 'center',
    color: '#f9fafb',
  },
  logo: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  unauthTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 16px',
    color: '#f97316',
  },
  unauthText: {
    fontSize: '16px',
    color: '#d1d5db',
    margin: '0 0 12px',
    lineHeight: '1.5',
  },
  unauthSubtext: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0',
  },
};
