/**
 * GET /api/crew/job/[id]
 * Proxies to ops API: GET /api/crew/job-detail/:id
 */

import { NextRequest, NextResponse } from 'next/server';

const OPS_API = process.env.OPS_API_URL || 'https://ops.autumn8.me';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${OPS_API}/api/crew/job-detail/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ error: 'Could not load job details' }, { status: 502 });
  }
}
