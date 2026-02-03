/**
 * In-memory rate limiter for MVP
 *
 * NOTE: For production at scale, use Vercel KV or Upstash Redis.
 * In-memory storage resets on server restart and doesn't work
 * across multiple serverless instances.
 */

interface RateLimitRecord {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

/**
 * Checks if an IP has exceeded the rate limit
 * @returns true if rate limited, false if allowed
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  const windowExpired = now - record.firstRequest > WINDOW_MS;

  if (windowExpired) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return false;
}

/**
 * Gets remaining requests for an IP
 */
export function getRemainingRequests(ip: string): number {
  const record = rateLimitStore.get(ip);

  if (!record) {
    return MAX_REQUESTS;
  }

  const windowExpired = Date.now() - record.firstRequest > WINDOW_MS;

  if (windowExpired) {
    return MAX_REQUESTS;
  }

  return Math.max(0, MAX_REQUESTS - record.count);
}

/**
 * Cleanup expired entries (call periodically to prevent memory leaks)
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());

  for (const [ip, record] of entries) {
    if (now - record.firstRequest > WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}
