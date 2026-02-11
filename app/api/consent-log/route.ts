import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

const CONSENT_VERSION = '2026-02-11';
// 13 months TTL (Provvedimento Garante: consent valid max 12 months + 1 month margin)
const CONSENT_TTL_SECONDS = 13 * 30 * 24 * 60 * 60;
const KEY_PREFIX = 'consent:';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

/** SHA-256 hash of IP — non-reversible, used only as unique key */
function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    return firstIp ? firstIp.trim() : 'unknown';
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

interface ConsentLogBody {
  action: 'accepted' | 'declined';
}

export async function POST(request: NextRequest) {
  const client = getRedis();

  if (!client) {
    // Redis not configured — silently succeed (fire-and-forget pattern)
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { action } = (body as ConsentLogBody) ?? {};
  if (action !== 'accepted' && action !== 'declined') {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  const ip = getClientIp(request);
  const key = `${KEY_PREFIX}${hashIp(ip)}`;

  try {
    await client.set(
      key,
      JSON.stringify({
        action,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      }),
      { ex: CONSENT_TTL_SECONDS }
    );
  } catch {
    // Fail silently — consent logging is best-effort
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
