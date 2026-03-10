/**
 * GET /api/crew/auth?t=TOKEN
 * Validates a signed crew token from an SMS link.
 * Sets a session cookie so subsequent /crew/* pages work without repeating the token.
 *
 * Token format: base64url(crewMemberId:exp:sig)
 * where sig = HMAC-SHA256(crewMemberId:exp, CREW_TOKEN_SECRET)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const OPS_API = process.env.OPS_API_URL || 'https://ops.autumn8.me';
const CREW_TOKEN_SECRET = process.env.CREW_TOKEN_SECRET || '';
const COOKIE_NAME = 'crew_token';
const COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours

function verifyToken(token: string): { crewMemberId: string } | null {
  if (!CREW_TOKEN_SECRET) return null;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 3) return null;

    const [crewMemberId, exp, sig] = parts;
    if (Date.now() > parseInt(exp, 10)) return null; // expired

    const expected = createHmac('sha256', CREW_TOKEN_SECRET)
      .update(`${crewMemberId}:${exp}`)
      .digest('hex');

    if (sig !== expected) return null;
    return { crewMemberId };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t');

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  // If CREW_TOKEN_SECRET is not set, skip signature verification (dev mode)
  let crewMemberId: string | null = null;
  if (!CREW_TOKEN_SECRET) {
    // Dev fallback: decode raw crewMemberId from token
    try {
      const decoded = Buffer.from(token, 'base64url').toString('utf8');
      crewMemberId = decoded.split(':')[0];
    } catch {}
  } else {
    const verified = verifyToken(token);
    if (!verified) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    crewMemberId = verified.crewMemberId;
  }

  if (!crewMemberId) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Fetch crew member info from ops API to confirm they exist
  let crewMember;
  try {
    const res = await fetch(`${OPS_API}/api/crew/schedule?crewMemberId=${crewMemberId}`, {
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json({ error: 'Crew member not found' }, { status: 404 });
    const data = await res.json();
    crewMember = data.crewMember;
  } catch {
    return NextResponse.json({ error: 'Could not verify crew member' }, { status: 502 });
  }

  // Set session cookie
  const response = NextResponse.json({ ok: true, crewMember });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/crew',
  });

  return response;
}
