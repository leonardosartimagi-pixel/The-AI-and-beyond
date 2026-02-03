import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-accent/20');
    expect(badge).toHaveClass('text-accent');
  });

  it('applies primary variant styles', () => {
    render(<Badge variant="primary" data-testid="badge">Primary</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-primary/20');
  });

  it('applies secondary variant styles', () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-white/20');
  });

  it('applies outline variant styles', () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('border-accent');
  });

  it('applies solid variant styles', () => {
    render(<Badge variant="solid" data-testid="badge">Solid</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-accent');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Badge size="sm" data-testid="badge">Small</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('text-xs');

    rerender(<Badge size="md" data-testid="badge">Medium</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('text-sm');

    rerender(<Badge size="lg" data-testid="badge">Large</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('text-base');
  });

  it('has rounded-full styling', () => {
    render(<Badge data-testid="badge">Rounded</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('rounded-full');
  });

  it('accepts custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });
});
