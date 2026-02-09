/**
 * Test Setup
 * This file is run before all tests to configure the testing environment.
 * Provides global mocks for Next.js, next-intl, framer-motion and next-themes.
 */

import React from 'react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// ============================================================
// Global mock: next/navigation (App Router)
// ============================================================
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/it',
  useParams: () => ({ locale: 'it' }),
  useSearchParams: () => new URLSearchParams(),
  useSelectedLayoutSegment: () => null,
  useSelectedLayoutSegments: () => [],
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// ============================================================
// Global mock: next/image
// ============================================================
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props);
  },
}));

// ============================================================
// Global mock: next-intl (with real Italian translations)
// ============================================================
// eslint-disable-next-line @typescript-eslint/no-require-imports
const messages = require('../messages/it.json');

function resolveKey(obj: Record<string, unknown>, namespace: string | undefined, key: string): string {
  const fullPath = namespace ? `${namespace}.${key}` : key;
  const parts = fullPath.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return fullPath;
    }
  }
  return typeof current === 'string' ? current : fullPath;
}

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => {
    const t = (key: string, values?: Record<string, unknown>) => {
      let result = resolveKey(messages, namespace, key);
      if (values && typeof result === 'string') {
        for (const [k, v] of Object.entries(values)) {
          result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }
      return result;
    };
    t.rich = (key: string, values?: Record<string, unknown>) => t(key, values);
    t.raw = (key: string) => resolveKey(messages, namespace, key);
    t.markup = (key: string, values?: Record<string, unknown>) => t(key, values);
    t.has = () => true;
    return t;
  },
  useLocale: () => 'it',
  useMessages: () => messages,
  useNow: () => new Date(),
  useTimeZone: () => 'Europe/Rome',
  useFormatter: () => ({
    number: (n: number) => String(n),
    dateTime: (d: Date) => d.toISOString(),
    relativeTime: () => '',
  }),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// ============================================================
// Global mock: next-themes
// ============================================================
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
    themes: ['light', 'dark'],
    systemTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// ============================================================
// Global mock: framer-motion
// Renders plain HTML elements, strips animation props.
// ============================================================
function createMotionComponent(tag: string) {
  return React.forwardRef(function MotionComponent(props: Record<string, unknown>, ref: React.Ref<unknown>) {
    const {
      // Strip framer-motion specific props
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      variants: _variants,
      whileHover: _whileHover,
      whileTap: _whileTap,
      whileInView: _whileInView,
      whileFocus: _whileFocus,
      whileDrag: _whileDrag,
      drag: _drag,
      dragConstraints: _dragConstraints,
      layout: _layout,
      layoutId: _layoutId,
      onAnimationComplete: _onAnimationComplete,
      onAnimationStart: _onAnimationStart,
      ...rest
    } = props;
    return React.createElement(tag, { ...rest, ref });
  });
}

const motionProxy = new Proxy(
  {},
  { get: (_target, prop: string) => createMotionComponent(prop) }
);

vi.mock('framer-motion', () => ({
  motion: motionProxy,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
  useInView: () => true,
  useScroll: () => ({ scrollY: { get: () => 0, on: vi.fn() }, scrollYProgress: { get: () => 0, on: vi.fn() } }),
  useTransform: () => 0,
  useMotionValue: (initial: number) => ({
    get: () => initial,
    set: vi.fn(),
    on: vi.fn(),
  }),
  useSpring: (value: number) => ({
    get: () => value,
    set: vi.fn(),
    on: vi.fn(),
  }),
  useReducedMotion: () => false,
  useMotionValueEvent: vi.fn(),
  stagger: () => 0,
}));

// ============================================================
// Environment variables
// ============================================================
process.env.RESEND_API_KEY = 'test_resend_api_key';
process.env.CONTACT_EMAIL = 'test@example.com';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

// ============================================================
// Browser API mocks (not available in jsdom)
// ============================================================
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});
