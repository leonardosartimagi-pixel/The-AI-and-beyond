import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '@/components/ui/Textarea';

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText(/enter message/i)).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Textarea label="Message" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when error is present', () => {
    render(<Textarea label="Message" error="Required" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby');
  });

  it('applies error border styles', () => {
    render(<Textarea error="Error" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('uses custom id when provided', () => {
    render(<Textarea id="custom-id" label="Custom" />);
    expect(screen.getByLabelText(/custom/i)).toHaveAttribute('id', 'custom-id');
  });

  it('has resize-none by default', () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-none');
  });
});
