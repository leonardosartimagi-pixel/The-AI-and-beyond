import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Redirect to default locale when accessing root
  localePrefix: 'always',
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (images, fonts, etc.)
  // - next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
