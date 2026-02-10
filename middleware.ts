import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/request';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Redirect to default locale when accessing root
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build CSP with nonce for script-src.
  // 'unsafe-inline' is kept as fallback: CSP Level 2+ browsers IGNORE it
  // when a nonce is present (spec behavior), so security is nonce-enforced.
  // Next.js hydration scripts need either nonce or unsafe-inline.
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'nonce-${nonce}'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://vercel.live`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob:",
    "media-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live",
    "frame-src 'self' https://vercel.live",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ];

  const cspHeader = cspDirectives.join('; ');

  // Set CSP header on the response
  response.headers.set('Content-Security-Policy', cspHeader);

  // Pass nonce to server components via custom header
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (images, fonts, etc.)
  // - next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
