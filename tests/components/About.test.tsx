import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '@/components/sections/About';

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
}));

describe('About', () => {
  it('renders the about section', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi siamo/i });
    expect(section).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi siamo/i });
    expect(section).toHaveAttribute('id', 'chi-siamo');
  });

  it('displays the section label', () => {
    render(<About />);
    expect(screen.getByText('Chi Siamo')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/chi/i);
    expect(heading).toHaveTextContent(/siamo/i);
  });

  it('displays the introduction paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/the ai and beyond nasce dall'esperienza/i)
    ).toBeInTheDocument();
  });

  it('displays the quote paragraph with border styling', () => {
    render(<About />);
    expect(
      screen.getByText(/the ai and beyond è una struttura snella/i)
    ).toBeInTheDocument();
  });

  it('displays the AI-first philosophy paragraph', () => {
    render(<About />);
    expect(screen.getByText(/quando lavori con noi/i)).toBeInTheDocument();
  });

  it('renders the profile photo', () => {
    render(<About />);
    const photo = screen.getByAltText(/the ai and beyond - consulenza ai/i);
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', '/images/about/profile.webp');
  });

  it('renders all three credibility badges', () => {
    render(<About />);
    expect(screen.getByText('Approccio Diretto')).toBeInTheDocument();
    expect(screen.getByText('AI-First')).toBeInTheDocument();
    expect(screen.getByText('Su Misura')).toBeInTheDocument();
  });

  it('renders badge descriptions', () => {
    render(<About />);
    expect(
      screen.getByText(/se l'ai non serve, te lo diciamo/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/usiamo l'ai ogni giorno/i)).toBeInTheDocument();
    expect(screen.getByText(/partiamo dal tuo processo/i)).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(<About className="custom-class" />);
    const section = screen.getByRole('region', { name: /chi siamo/i });
    expect(section).toHaveClass('custom-class');
  });

  it('has decorative gradient blur elements', () => {
    const { container } = render(<About />);
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the floating logo element', () => {
    render(<About />);
    const logos = screen.getAllByAltText('The AI and beyond');
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('has decorative frame elements for photo', () => {
    const { container } = render(<About />);
    const frameElements = container.querySelectorAll('.rounded-2xl');
    expect(frameElements.length).toBeGreaterThanOrEqual(3);
  });

  it('uses asymmetric grid layout on desktop', () => {
    const { container } = render(<About />);
    const gridContainer = container.querySelector('.lg\\:grid-cols-12');
    expect(gridContainer).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<About />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]?.tagName).toBe('H2');
  });

  it('renders icons with proper aria-hidden', () => {
    const { container } = render(<About />);
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it('applies border-l styling to quote paragraph', () => {
    const { container } = render(<About />);
    const quoteParagraph = container.querySelector('.border-l-2');
    expect(quoteParagraph).toBeInTheDocument();
    expect(quoteParagraph).toHaveClass('italic');
  });
});
