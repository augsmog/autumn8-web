'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

const OPS_API = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';
const GPS_INTERVAL_MS = 30_000; // report every 30 seconds

const API_BASE = process.env.NEXT_PUBLIC_OPS_API_URL || 'https://ops.autumn8.me';

interface JobDetails {
  id: number;
  contactName: string;
  address: string;
  serviceType: string;
  scheduledAt: string;
  crewMemberName: string;
  alreadyCompleted?: boolean;
  completedAt?: string;
}

export default function JobCompletePage() {
  const params = useParams();
  const token = params?.token as string;

  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const gpsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form state
  const [durationMinutes, setDurationMinutes] = useState('');
  const [notes, setNotes] = useState('');
  const [issuesFound, setIssuesFound] = useState('');
  const [upsellOpportunity, setUpsellOpportunity] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [invoiceAdjustment, setInvoiceAdjustment] = useState(false);
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');

  // Background GPS reporting — runs while crew is on-site, stops on job submission.
  // Uses browser Geolocation API (requires HTTPS in production).
  // Silently skips if geolocation is denied or unavailable — never blocks the form.
  useEffect(() => {
    if (!token || submitted) return;
    if (!('geolocation' in navigator)) return;

    const reportLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetch(`${OPS_API}/api/crew/job/${token}/location`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              heading: pos.coords.heading ?? undefined,
              speed: pos.coords.speed ?? undefined,
            }),
          }).catch(() => {}); // silent — never interrupt the crew's workflow
        },
        () => {}, // silent on permission denied or error
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 20000 }
      );
    };

    // Report immediately on page load, then every 30 seconds
    reportLocation();
    gpsIntervalRef.current = setInterval(reportLocation, GPS_INTERVAL_MS);

    return () => { if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current); };
  }, [token, submitted]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/crew/job/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.alreadyCompleted) {
          setSubmitted(true);
          setJob(data);
        } else {
          setJob(data);
        }
      })
      .catch(() => setError('Unable to load job details. Check your connection and try again.'))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/crew/job/${token}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration_minutes: durationMinutes ? parseInt(durationMinutes) : null,
          notes: notes || null,
          issues_found: issuesFound || null,
          upsell_opportunity: upsellOpportunity || null,
          materials_used: materialsUsed || null,
          invoice_adjustment_requested: invoiceAdjustment,
          invoice_adjustment_amount: invoiceAdjustment && adjustmentAmount ? parseFloat(adjustmentAmount) : null,
          invoice_adjustment_reason: invoiceAdjustment ? adjustmentReason : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Stop GPS reporting — job is done
        if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current);
        setSubmitted(true);
      } else {
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Couldn't load job</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report submitted!</h1>
          <p className="text-gray-500 text-lg">Have a great rest of your day.</p>
          {job?.contactName && (
            <p className="text-gray-400 text-sm mt-4">
              {job.contactName}{job.address ? ` · ${job.address}` : ''}
            </p>
          )}
        </div>
      </div>
    );
  }

  const scheduledTime = job?.scheduledAt
    ? new Date(job.scheduledAt).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-500 text-white px-4 py-5 safe-area-top">
        <div className="max-w-lg mx-auto">
          <p className="text-orange-100 text-sm font-medium uppercase tracking-wide mb-1">Job Report</p>
          <h1 className="text-xl font-bold">{job?.contactName || 'Customer'}</h1>
          {job?.address && <p className="text-orange-100 text-sm mt-0.5">{job.address}</p>}
          {scheduledTime && <p className="text-orange-200 text-xs mt-1">{scheduledTime}</p>}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Time on site (minutes)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            placeholder="e.g. 45"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Job Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Job notes <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did the job go? Anything worth noting for next time?"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Issues Found */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Issues or concerns <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            rows={2}
            value={issuesFound}
            onChange={(e) => setIssuesFound(e.target.value)}
            placeholder="Any problems found that the owner should know about?"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Upsell Opportunity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Upsell opportunity <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={upsellOpportunity}
            onChange={(e) => setUpsellOpportunity(e.target.value)}
            placeholder="e.g. Customer asked about mosquito treatment"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Materials Used */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Materials used <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={materialsUsed}
            onChange={(e) => setMaterialsUsed(e.target.value)}
            placeholder="e.g. 2 gallons bifenthrin, 1 termite bait station"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Invoice Adjustment */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={invoiceAdjustment}
              onChange={(e) => setInvoiceAdjustment(e.target.checked)}
              className="w-5 h-5 rounded accent-orange-500"
            />
            <span className="text-sm font-semibold text-gray-700">Request invoice adjustment</span>
          </label>

          {invoiceAdjustment && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Amount ($)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  placeholder="e.g. 25.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Reason</label>
                <input
                  type="text"
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="e.g. Extra treatment required for severe infestation"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-60 text-white font-bold text-lg py-4 rounded-2xl transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>

        <p className="text-center text-gray-400 text-xs pb-4">
          Powered by Autumn8
        </p>
      </form>
    </div>
  );
}
