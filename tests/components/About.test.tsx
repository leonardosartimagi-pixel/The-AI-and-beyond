import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '@/components/sections/About';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <p {...props}>{children}</p>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <span {...props}>{children}</span>
    ),
  },
  useInView: () => true,
}));

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
}));

describe('About', () => {
  it('renders the about section', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<About />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toHaveAttribute('id', 'chi-sono');
  });

  it('displays the section label', () => {
    render(<About />);
    expect(screen.getByText('Chi Sono')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/trasformo sfide in/i);
    expect(heading).toHaveTextContent(/opportunità/i);
  });

  it('displays the introduction paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/mi chiamo leonardo/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/intelligenza artificiale/i)
    ).toBeInTheDocument();
  });

  it('displays the quote paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/non vendo promesse irrealizzabili/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/soluzioni che funzionano/i)
    ).toBeInTheDocument();
  });

  it('displays the closing paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/ogni progetto parte dall'ascolto/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/problemi reali/i)
    ).toBeInTheDocument();
  });

  it('renders the photo placeholder', () => {
    render(<About />);
    expect(screen.getByText(/foto placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/immagine professionale/i)).toBeInTheDocument();
  });

  it('renders all three credibility badges', () => {
    render(<About />);
    expect(screen.getByText('Approccio Pratico')).toBeInTheDocument();
    expect(screen.getByText('Risultati Rapidi')).toBeInTheDocument();
    expect(screen.getByText('Su Misura')).toBeInTheDocument();
  });

  it('renders badge descriptions', () => {
    render(<About />);
    expect(screen.getByText('Soluzioni concrete')).toBeInTheDocument();
    expect(screen.getByText('Iterazioni veloci')).toBeInTheDocument();
    expect(screen.getByText('Adattato al contesto')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(<About className="custom-class" />);
    const section = screen.getByRole('region', { name: /chi sono/i });
    expect(section).toHaveClass('custom-class');
  });

  it('has decorative gradient blur elements', () => {
    const { container } = render(<About />);
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the floating AI accent element', () => {
    render(<About />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('& Beyond')).toBeInTheDocument();
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
    expect(headings[0].tagName).toBe('H2');
  });

  it('renders icons with proper aria-hidden', () => {
    const { container } = render(<About />);
    const icons = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThanOrEqual(4);
  });

  it('applies border-l styling to quote paragraph', () => {
    const { container } = render(<About />);
    const quoteParagraph = container.querySelector('.border-l-2');
    expect(quoteParagraph).toBeInTheDocument();
    expect(quoteParagraph).toHaveClass('italic');
  });
});
