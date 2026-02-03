import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });

  it('handles checked state changes', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Toggle" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<Checkbox error="You must accept" />);
    expect(screen.getByRole('alert')).toHaveTextContent('You must accept');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Checkbox label="Terms" error="Required" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby when error is present', () => {
    render(<Checkbox label="Terms" error="Required" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
  });

  it('applies error border styles', () => {
    render(<Checkbox error="Error" data-testid="checkbox" />);
    expect(screen.getByRole('checkbox')).toHaveClass('border-red-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled label="Disabled" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('can be checked by default', () => {
    render(<Checkbox defaultChecked label="Checked" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('uses custom id when provided', () => {
    render(<Checkbox id="custom-id" label="Custom" />);
    expect(screen.getByLabelText(/custom/i)).toHaveAttribute('id', 'custom-id');
  });
});
