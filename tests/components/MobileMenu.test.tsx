import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from '@/components/layout/MobileMenu';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
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

describe('MobileMenu', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onNavClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('renders navigation items when open', () => {
    render(<MobileMenu {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Chi Sono' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Servizi' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Portfolio' })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<MobileMenu {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onNavClick when navigation item is clicked', () => {
    const onNavClick = vi.fn();
    render(<MobileMenu {...defaultProps} onNavClick={onNavClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Chi Sono' }));
    expect(onNavClick).toHaveBeenCalledWith('chi-sono');
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<MobileMenu {...defaultProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('has dialog role with aria-modal', () => {
    render(<MobileMenu {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has accessible navigation landmark', () => {
    render(<MobileMenu {...defaultProps} />);
    expect(screen.getByRole('navigation', { name: /menu mobile/i })).toBeInTheDocument();
  });

  it('renders Parliamone CTA button', () => {
    render(<MobileMenu {...defaultProps} />);
    expect(screen.getByRole('button', { name: /parliamone/i })).toBeInTheDocument();
  });

  it('calls onNavClick with contatti when CTA is clicked', () => {
    const onNavClick = vi.fn();
    render(<MobileMenu {...defaultProps} onNavClick={onNavClick} />);

    fireEvent.click(screen.getByRole('button', { name: /parliamone/i }));
    expect(onNavClick).toHaveBeenCalledWith('contatti');
  });

  it('locks body scroll when open', () => {
    render(<MobileMenu {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unlocks body scroll when closed', () => {
    const { rerender } = render(<MobileMenu {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<MobileMenu {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');
  });
});
