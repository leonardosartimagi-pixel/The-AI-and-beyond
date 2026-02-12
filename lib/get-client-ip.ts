import type { NextRequest } from 'next/server';

/**
 * Extract the client IP address from a Next.js request.
 *
 * Checks headers in order: x-forwarded-for (first IP) → x-real-ip → 'unknown'.
 * Works behind reverse proxies (Vercel, Cloudflare, nginx).
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    return firstIp ? firstIp.trim() : 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}
