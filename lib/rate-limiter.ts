/**
 * Distributed rate limiter using Upstash Redis
 *
 * Uses fixed-window counter with TTL-based expiration.
 * Works across all serverless instances on Vercel.
 */

import { Redis } from '@upstash/redis';

const WINDOW_SECONDS = 15 * 60; // 15 minutes
const MAX_REQUESTS = 3;
const KEY_PREFIX = 'rate_limit:contact:';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[Rate Limiter] KV_REST_API_URL or KV_REST_API_TOKEN not set');
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

/**
 * Checks if an IP has exceeded the rate limit.
 * Falls back to allowing the request if Redis is unavailable.
 * @returns true if rate limited, false if allowed
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const client = getRedis();

  if (!client) {
    return false;
  }

  const key = `${KEY_PREFIX}${ip}`;

  try {
    const count = await client.incr(key);

    // Set TTL only on first request (when count becomes 1)
    if (count === 1) {
      await client.expire(key, WINDOW_SECONDS);
    }

    return count > MAX_REQUESTS;
  } catch (error) {
    console.error(
      '[Rate Limiter] Redis error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    // Fail open: allow request if Redis is down
    return false;
  }
}

/**
 * Gets remaining requests for an IP
 */
export async function getRemainingRequests(ip: string): Promise<number> {
  const client = getRedis();

  if (!client) {
    return MAX_REQUESTS;
  }

  const key = `${KEY_PREFIX}${ip}`;

  try {
    const count = (await client.get<number>(key)) ?? 0;
    return Math.max(0, MAX_REQUESTS - count);
  } catch {
    return MAX_REQUESTS;
  }
}
