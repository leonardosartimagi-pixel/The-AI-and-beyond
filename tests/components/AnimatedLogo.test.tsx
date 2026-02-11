import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedLogo } from '@/components/sections/AnimatedLogo';

// Mock the useReducedMotion hook
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
}));

describe('AnimatedLogo', () => {
  it('renders an SVG element', () => {
    render(<AnimatedLogo />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('has proper aria-label for accessibility', () => {
    render(<AnimatedLogo />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute(
      'aria-label',
      'Logo The AI and beyond - Onda stilizzata'
    );
  });

  it('contains a title element for screen readers', () => {
    render(<AnimatedLogo />);
    expect(screen.getByText('The AI and beyond Logo')).toBeInTheDocument();
  });

  it('applies default dimensions', () => {
    render(<AnimatedLogo />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '80');
  });

  it('accepts custom dimensions', () => {
    render(<AnimatedLogo width={300} height={120} />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '120');
  });

  it('accepts custom className', () => {
    render(<AnimatedLogo className="custom-class" />);
    const svg = screen.getByRole('img');
    expect(svg).toHaveClass('custom-class');
  });

  it('contains the wave gradient definition', () => {
    const { container } = render(<AnimatedLogo />);
    const gradient = container.querySelector('#waveGradient');
    expect(gradient).toBeInTheDocument();
  });

  it('contains the glow filter definition', () => {
    const { container } = render(<AnimatedLogo />);
    const filter = container.querySelector('#glow');
    expect(filter).toBeInTheDocument();
  });

  it('renders multiple path elements for the wave effect', () => {
    const { container } = render(<AnimatedLogo />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });
});
