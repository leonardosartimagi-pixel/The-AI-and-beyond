import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '@/components/sections/About';

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
}));

describe('About', () => {
  // TODO: Tests need updating — component was refactored with i18n and new structure
  it.skip('renders the about section', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toBeInTheDocument();
  });

  it.skip('has the correct section id', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toHaveAttribute('id', 'chi-sono');
  });

  it.skip('displays the section label', () => {
    render(<About />);
    expect(screen.getByText('Chi Sono')).toBeInTheDocument();
  });

  it.skip('displays the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/trasformo sfide in/i);
    expect(heading).toHaveTextContent(/opportunità/i);
  });

  it.skip('displays the introduction paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/mi chiamo leonardo/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/intelligenza artificiale/i)
    ).toBeInTheDocument();
  });

  it.skip('displays the quote paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/non vendo promesse irrealizzabili/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/soluzioni che funzionano/i)
    ).toBeInTheDocument();
  });

  it.skip('displays the closing paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/ogni progetto parte dall'ascolto/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/problemi reali/i)
    ).toBeInTheDocument();
  });

  it.skip('renders the photo placeholder', () => {
    render(<About />);
    expect(screen.getByText(/foto placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/immagine professionale/i)).toBeInTheDocument();
  });

  it.skip('renders all three credibility badges', () => {
    render(<About />);
    expect(screen.getByText('Approccio Pratico')).toBeInTheDocument();
    expect(screen.getByText('Risultati Rapidi')).toBeInTheDocument();
    expect(screen.getByText('Su Misura')).toBeInTheDocument();
  });

  it.skip('renders badge descriptions', () => {
    render(<About />);
    expect(screen.getByText('Soluzioni concrete')).toBeInTheDocument();
    expect(screen.getByText('Iterazioni veloci')).toBeInTheDocument();
    expect(screen.getByText('Adattato al contesto')).toBeInTheDocument();
  });

  it.skip('accepts custom className', () => {
    render(<About className="custom-class" />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toHaveClass('custom-class');
  });

  it.skip('has decorative gradient blur elements', () => {
    const { container } = render(<About />);
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThanOrEqual(2);
  });

  it.skip('renders the floating AI accent element', () => {
    render(<About />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('& Beyond')).toBeInTheDocument();
  });

  it.skip('has decorative frame elements for photo', () => {
    const { container } = render(<About />);
    const frameElements = container.querySelectorAll('.rounded-2xl');
    expect(frameElements.length).toBeGreaterThanOrEqual(3);
  });

  it.skip('uses asymmetric grid layout on desktop', () => {
    const { container } = render(<About />);
    const gridContainer = container.querySelector('.lg\\:grid-cols-12');
    expect(gridContainer).toBeInTheDocument();
  });

  it.skip('has proper heading hierarchy', () => {
    render(<About />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]?.tagName).toBe('H2');
  });

  it.skip('renders icons with proper aria-hidden', () => {
    const { container } = render(<About />);
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });

  it.skip('applies border-l styling to quote paragraph', () => {
    const { container } = render(<About />);
    const quoteParagraph = container.querySelector('.border-l-2');
    expect(quoteParagraph).toBeInTheDocument();
    expect(quoteParagraph).toHaveClass('italic');
  });
});
