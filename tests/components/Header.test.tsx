import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header, NAV_ITEMS } from '@/components/layout/Header';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, initial, animate, transition, ...props }: { children: React.ReactNode; initial?: unknown; animate?: unknown; transition?: unknown }) => (
      <header {...props}>{children}</header>
    ),
    span: ({ children, animate, transition, ...props }: { children: React.ReactNode; animate?: unknown; transition?: unknown }) => (
      <span {...props}>{children}</span>
    ),
    div: ({ children, initial, animate, exit, transition, ...props }: { children: React.ReactNode; initial?: unknown; animate?: unknown; exit?: unknown; transition?: unknown }) => (
      <div {...props}>{children}</div>
    ),
    li: ({ children, initial, animate, transition, ...props }: { children: React.ReactNode; initial?: unknown; animate?: unknown; transition?: unknown }) => (
      <li {...props}>{children}</li>
    ),
    button: ({ children, whileHover, whileTap, ...props }: { children: React.ReactNode; whileHover?: unknown; whileTap?: unknown }) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    render(<Header />);
    const logos = screen.getAllByAltText('The AI and Beyond');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders navigation links on desktop', () => {
    render(<Header />);
    NAV_ITEMS.forEach((item) => {
      expect(screen.getByRole('button', { name: item.label })).toBeInTheDocument();
    });
  });

  it('renders the Parliamone CTA button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /parliamone/i })).toBeInTheDocument();
  });

  it('renders hamburger menu button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /apri menu/i })).toBeInTheDocument();
  });

  it('has accessible navigation landmark', () => {
    render(<Header />);
    expect(screen.getByRole('navigation', { name: /navigazione principale/i })).toBeInTheDocument();
  });

  it('logo has accessible label', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /torna alla home/i })).toBeInTheDocument();
  });

  it('hamburger button toggles aria-expanded', () => {
    render(<Header />);
    const hamburger = screen.getByRole('button', { name: /apri menu/i });

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('exports NAV_ITEMS constant', () => {
    expect(NAV_ITEMS).toHaveLength(5);
    expect(NAV_ITEMS[0]).toEqual({ label: 'Chi Sono', href: 'chi-sono' });
  });
});
