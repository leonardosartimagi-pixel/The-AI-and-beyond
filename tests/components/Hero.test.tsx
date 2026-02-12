import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

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
    const section = screen.getByRole('region', { name: /l'ai funziona/i });
    expect(section).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /l'ai funziona/i });
    expect(section).toHaveAttribute('id', 'hero');
  });

  it('displays the main headline', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/l'ai funziona/i);
    expect(heading).toHaveTextContent(/se parti dal problema giusto/i);
  });

  it('displays the subtitle text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/troviamo dove il tuo business perde tempo/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/poi costruiamo lo strumento che lo risolve/i)
    ).toBeInTheDocument();
  });

  it('renders all four keyword badges', () => {
    render(<Hero />);
    expect(screen.getByText('Strategia AI')).toBeInTheDocument();
    expect(screen.getByText('Automazione')).toBeInTheDocument();
    expect(screen.getByText('Sviluppo')).toBeInTheDocument();
    expect(screen.getByText('Ottimizzazione')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('button', { name: /parliamone/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('CTA button triggers scroll to contatti section', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('button', { name: /parliamone/i });
    fireEvent.click(ctaButton);
    expect(mockScrollTo).toHaveBeenCalledWith('contatti');
  });

  it('accepts custom className', () => {
    render(<Hero className="custom-class" />);
    const section = screen.getByRole('region', { name: /l'ai funziona/i });
    expect(section).toHaveClass('custom-class');
  });

  it('renders the logo image', () => {
    render(<Hero />);
    const logo = screen.getByAltText('The AI and beyond');
    expect(logo).toBeInTheDocument();
  });

  it('renders the scroll indicator', () => {
    const { container } = render(<Hero />);
    const scrollIndicator = container.querySelector(
      'svg[stroke="currentColor"]'
    );
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('has decorative background elements', () => {
    const { container } = render(<Hero />);
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThanOrEqual(2);
  });

  it('displays micro-copy text below CTA', () => {
    render(<Hero />);
    expect(
      screen.getByText(/nessun preventivo automatico/i)
    ).toBeInTheDocument();
  });
});
