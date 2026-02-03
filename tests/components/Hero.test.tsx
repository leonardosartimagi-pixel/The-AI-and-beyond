import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <p {...props}>{children}</p>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <span {...props}>{children}</span>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <button {...props}>{children}</button>
    ),
    svg: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <svg {...props}>{children}</svg>
    ),
    path: (props: object) => <path {...props} />,
  },
}));

// Mock hooks
const mockScrollTo = vi.fn();
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
  useScrollTo: () => mockScrollTo,
}));

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the hero section', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /sezione principale/i });
    expect(section).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /sezione principale/i });
    expect(section).toHaveAttribute('id', 'hero');
  });

  it('displays the main headline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /trasformo idee in soluzioni ai/i
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /che funzionano/i
    );
  });

  it('displays the subtitle text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/consulenza e sviluppo per aziende/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/intelligenza artificiale/i)
    ).toBeInTheDocument();
  });

  it('renders all four keyword badges', () => {
    render(<Hero />);
    expect(screen.getByText('Qualità')).toBeInTheDocument();
    expect(screen.getByText('Velocità')).toBeInTheDocument();
    expect(screen.getByText('Sicurezza')).toBeInTheDocument();
    expect(screen.getByText('Controllo')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('button', { name: /scopri come posso aiutarti/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('CTA button triggers scroll to contatti section', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('button', { name: /scopri come posso aiutarti/i });
    fireEvent.click(ctaButton);
    expect(mockScrollTo).toHaveBeenCalledWith('contatti');
  });

  it('accepts custom className', () => {
    render(<Hero className="custom-class" />);
    const section = screen.getByRole('region', { name: /sezione principale/i });
    expect(section).toHaveClass('custom-class');
  });

  it('renders the AnimatedLogo component', () => {
    render(<Hero />);
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders the scroll indicator', () => {
    const { container } = render(<Hero />);
    const scrollIndicator = container.querySelector('svg[stroke="currentColor"]');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('has gradient background elements', () => {
    const { container } = render(<Hero />);
    const gradientBg = container.querySelector('.bg-gradient-to-br');
    expect(gradientBg).toBeInTheDocument();
  });

  it('badge container has proper aria-label', () => {
    render(<Hero />);
    const badgeContainer = screen.getByLabelText(/valori principali/i);
    expect(badgeContainer).toBeInTheDocument();
  });
});
