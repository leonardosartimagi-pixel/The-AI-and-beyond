import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { getClientIp } from '@/lib/get-client-ip';

function createMockRequest(headers: Record<string, string> = {}): NextRequest {
  return new NextRequest('http://localhost:3000/api/test', { headers });
}

describe('getClientIp', () => {
  it('returns first IP from x-forwarded-for header', () => {
    const request = createMockRequest({
      'x-forwarded-for': '203.0.113.50, 70.41.3.18, 150.172.238.178',
    });

    expect(getClientIp(request)).toBe('203.0.113.50');
  });

  it('trims whitespace from x-forwarded-for IP', () => {
    const request = createMockRequest({
      'x-forwarded-for': '  203.0.113.50 , 70.41.3.18',
    });

    expect(getClientIp(request)).toBe('203.0.113.50');
  });

  it('returns single IP from x-forwarded-for without commas', () => {
    const request = createMockRequest({
      'x-forwarded-for': '203.0.113.50',
    });

    expect(getClientIp(request)).toBe('203.0.113.50');
  });

  it('returns unknown for empty x-forwarded-for', () => {
    const request = createMockRequest({
      'x-forwarded-for': '',
    });

    // Empty string is falsy, so falls through to x-real-ip check
    expect(getClientIp(request)).toBe('unknown');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const request = createMockRequest({
      'x-real-ip': '198.51.100.23',
    });

    expect(getClientIp(request)).toBe('198.51.100.23');
  });

  it('prefers x-forwarded-for over x-real-ip', () => {
    const request = createMockRequest({
      'x-forwarded-for': '203.0.113.50',
      'x-real-ip': '198.51.100.23',
    });

    expect(getClientIp(request)).toBe('203.0.113.50');
  });

  it('returns unknown when no IP headers are present', () => {
    const request = createMockRequest();

    expect(getClientIp(request)).toBe('unknown');
  });

  it('handles IPv6 addresses in x-forwarded-for', () => {
    const request = createMockRequest({
      'x-forwarded-for': '2001:db8::1, 2001:db8::2',
    });

    expect(getClientIp(request)).toBe('2001:db8::1');
  });

  it('handles IPv6 address in x-real-ip', () => {
    const request = createMockRequest({
      'x-real-ip': '::1',
    });

    expect(getClientIp(request)).toBe('::1');
  });
});
