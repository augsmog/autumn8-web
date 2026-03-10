'use client';

/**
 * Customer-facing live tracking page.
 * Polled every 15 seconds to show real-time crew position and ETA.
 *
 * Gap analysis A17 — Layer 1: customer-facing live tracking.
 *
 * Map display: uses OpenStreetMap tiles via Leaflet (no API key required, free).
 * ETA: returned from the server (straight-line distance approximation at MVP;
 *      upgrade to Google Maps Directions API by adding GOOGLE_MAPS_API_KEY to ops .env).
 *
 * This page is intentionally lightweight — no auth, no login, just a token.
 * The token expires after 8 hours and sessions are single-use.
 */

import { useEffect, useState, useRef, Suspense } from 'react';
import { useParams } from 'next/navigation';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';
const POLL_INTERVAL_MS = 15_000;

interface TrackingData {
  status: 'active' | 'completed' | 'cancelled';
  crewName: string | null;
  contactName: string | null;
  destinationAddress: string | null;
  crew: { lat: number; lng: number; lastUpdated: string } | null;
  destination: { lat: number; lng: number } | null;
  etaMinutes: number | null;
  arrived: boolean;
  dispatchedAt: string;
  expiresAt: string;
}

function formatEta(minutes: number | null): string {
  if (minutes === null) return 'Calculating...';
  if (minutes <= 1) return 'Less than a minute';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function StatusBadge({ arrived, etaMinutes }: { arrived: boolean; etaMinutes: number | null }) {
  if (arrived) {
    return (
      <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Arrived
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
      On the way
    </div>
  );
}

// Simple static map placeholder — renders an OpenStreetMap iframe when coords are available.
// Leaflet would give a nicer interactive map but requires a client-side library install.
// The iframe approach works with zero dependencies.
function MapView({ crew, destination }: { crew: { lat: number; lng: number } | null; destination: { lat: number; lng: number } | null }) {
  const zoom = 14;

  if (!crew) {
    return (
      <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-400 text-sm">Waiting for location...</p>
      </div>
    );
  }

  // OpenStreetMap embed via iframe — free, no API key required
  const bbox = crew
    ? `${crew.lng - 0.01},${crew.lat - 0.008},${crew.lng + 0.01},${crew.lat + 0.008}`
    : '';
  const marker = crew ? `&marker=${crew.lat},${crew.lng}` : '';
  const destMarker = destination ? `&marker=${destination.lat},${destination.lng}` : '';
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}${destMarker}`;

  return (
    <div className="w-full h-56 rounded-2xl overflow-hidden border border-gray-200">
      <iframe
        src={src}
        className="w-full h-full"
        title="Live map"
        loading="lazy"
        style={{ border: 0 }}
      />
    </div>
  );
}

function TrackingContent() {
  const params = useParams();
  const token = params?.token as string;
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTracking = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${OPS_API}/api/location/tracking/${token}`);
      if (!res.ok) throw new Error(res.status === 404 ? 'Tracking link not found or expired.' : 'Failed to load tracking data.');
      const json = await res.json();
      setData(json);
      setError(null);

      // Stop polling when session is done
      if (json.status !== 'active') {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to load tracking data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    intervalRef.current = setInterval(fetchTracking, POLL_INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Link not found</h1>
          <p className="text-gray-500 text-sm">{error}</p>
          <p className="text-gray-400 text-xs mt-3">Tracking links expire 8 hours after dispatch.</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Completed or cancelled
  if (data.status !== 'active') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">{data.status === 'completed' ? '✅' : '📋'}</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {data.status === 'completed' ? 'Job Complete' : 'Tracking Ended'}
          </h1>
          <p className="text-gray-500 text-sm">
            {data.status === 'completed'
              ? `${data.crewName || 'Your technician'} has finished for the day. Thanks for choosing us!`
              : 'This tracking session has ended.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-orange-500 text-white px-4 pt-10 pb-6 safe-area-top">
        <div className="max-w-lg mx-auto">
          <p className="text-orange-100 text-sm font-medium uppercase tracking-wide mb-1">Live Tracking</p>
          <h1 className="text-2xl font-bold">
            {data.crewName || 'Your technician'} is on the way
          </h1>
          {data.destinationAddress && (
            <p className="text-orange-100 text-sm mt-1">{data.destinationAddress}</p>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Status + ETA */}
        <div className="flex items-center justify-between">
          <StatusBadge arrived={data.arrived} etaMinutes={data.etaMinutes} />
          {!data.arrived && (
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{formatEta(data.etaMinutes)}</p>
              <p className="text-xs text-gray-400">estimated arrival</p>
            </div>
          )}
        </div>

        {/* Arrived callout */}
        {data.arrived && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-green-800 font-semibold">
              {data.crewName || 'Your technician'} has arrived! 🎉
            </p>
          </div>
        )}

        {/* Map */}
        <MapView crew={data.crew} destination={data.destination} />

        {/* Details */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          {data.crewName && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Technician</span>
              <span className="text-gray-900 font-medium">{data.crewName}</span>
            </div>
          )}
          {data.crew?.lastUpdated && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last updated</span>
              <span className="text-gray-900">
                {new Date(data.crew.lastUpdated).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          )}
          {!data.arrived && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">ETA</span>
              <span className="text-gray-900 font-medium">{formatEta(data.etaMinutes)}</span>
            </div>
          )}
        </div>

        <p className="text-center text-gray-300 text-xs">
          Page updates automatically · Powered by Autumn8
        </p>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}
