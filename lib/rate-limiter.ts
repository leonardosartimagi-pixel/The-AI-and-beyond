/**
 * Distributed rate limiter using Upstash Redis
 *
 * Uses fixed-window counter with TTL-based expiration.
 * Works across all serverless instances on Vercel.
 *
 * Fallback: in-memory Map when Redis is unavailable (per-instance only,
 * not distributed — still provides per-instance protection during Redis outages).
 */

import { Redis } from '@upstash/redis';

const WINDOW_SECONDS = 15 * 60; // 15 minutes
const WINDOW_MS = WINDOW_SECONDS * 1000;
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

// ── In-memory fallback ──────────────────────────────────────────────
// Per-instance Map used when Redis is unavailable. Provides rate limiting
// within a single serverless instance but NOT across instances.

interface MemoryEntry {
  count: number;
  expiresAt: number;
}

const memoryStore = new Map<string, MemoryEntry>();

function memoryIncr(ip: string): number {
  const now = Date.now();
  const existing = memoryStore.get(ip);

  if (existing && existing.expiresAt > now) {
    existing.count += 1;
    return existing.count;
  }

  // New window or expired entry
  memoryStore.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
  return 1;
}

function memoryGetCount(ip: string): number {
  const now = Date.now();
  const existing = memoryStore.get(ip);
  if (existing && existing.expiresAt > now) return existing.count;
  return 0;
}

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      memoryStore.forEach((entry, key) => {
        if (entry.expiresAt <= now) {
          memoryStore.delete(key);
        }
      });
    },
    5 * 60 * 1000
  );
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Checks if an IP has exceeded the rate limit.
 * Uses Upstash Redis (distributed). Falls back to in-memory if Redis is unavailable.
 * @returns true if rate limited, false if allowed
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const client = getRedis();

  if (!client) {
    // No Redis configured → use in-memory fallback
    return memoryIncr(ip) > MAX_REQUESTS;
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
    // Redis down → fall back to in-memory (per-instance protection)
    return memoryIncr(ip) > MAX_REQUESTS;
  }
}

/**
 * Gets remaining requests for an IP
 */
export async function getRemainingRequests(ip: string): Promise<number> {
  const client = getRedis();

  if (!client) {
    return Math.max(0, MAX_REQUESTS - memoryGetCount(ip));
  }

  const key = `${KEY_PREFIX}${ip}`;

  try {
    const count = (await client.get<number>(key)) ?? 0;
    return Math.max(0, MAX_REQUESTS - count);
  } catch {
    return Math.max(0, MAX_REQUESTS - memoryGetCount(ip));
  }
}
