/**
 * GET /api/crew/schedule
 * Proxies to ops API: GET /api/crew/schedule?crewMemberId=X
 * Reads crewMemberId from session cookie.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const OPS_API = process.env.OPS_API_URL || 'https://ops.autumn8.me';
const CREW_TOKEN_SECRET = process.env.CREW_TOKEN_SECRET || '';

function getCrewMemberIdFromCookie(cookieValue: string): string | null {
  try {
    const decoded = Buffer.from(cookieValue, 'base64url').toString('utf8');
    const [crewMemberId, exp, sig] = decoded.split(':');
    if (!crewMemberId) return null;
    if (CREW_TOKEN_SECRET) {
      if (Date.now() > parseInt(exp, 10)) return null;
      const expected = createHmac('sha256', CREW_TOKEN_SECRET)
        .update(`${crewMemberId}:${exp}`)
        .digest('hex');
      if (sig !== expected) return null;
    }
    return crewMemberId;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get('crew_token')?.value;

  // Also allow ?crewMemberId= for direct calls (from auth flow)
  const directId = req.nextUrl.searchParams.get('crewMemberId');
  const crewMemberId = directId || (cookieVal ? getCrewMemberIdFromCookie(cookieVal) : null);

  if (!crewMemberId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const res = await fetch(`${OPS_API}/api/crew/schedule?crewMemberId=${crewMemberId}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ error: 'Could not load schedule' }, { status: 502 });
  }
}
