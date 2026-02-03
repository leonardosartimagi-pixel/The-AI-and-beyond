import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Name" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when error is present', () => {
    render(<Input label="Name" error="Required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('applies error border styles', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts different input types', () => {
    render(<Input type="email" label="Email" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
  });

  it('uses custom id when provided', () => {
    render(<Input id="custom-id" label="Custom" />);
    expect(screen.getByLabelText(/custom/i)).toHaveAttribute('id', 'custom-id');
  });
});
