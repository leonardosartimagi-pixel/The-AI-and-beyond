import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ROICalculator } from '@/components/sections/ROICalculator';

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => true, // reduced motion for simpler test rendering
}));

describe('ROICalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Section Structure', () => {
    it('renders the section with correct id', () => {
      render(<ROICalculator />);
      const section = screen.getByRole('region', { name: /calcola il roi/i });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'roi-calculator');
    });

    it('accepts custom className', () => {
      render(<ROICalculator className="custom-class" />);
      const section = screen.getByRole('region', { name: /calcola il roi/i });
      expect(section).toHaveClass('custom-class');
    });

    it('displays the section heading', () => {
      render(<ROICalculator />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('displays input and results cards', () => {
      render(<ROICalculator />);
      const inputTitle = screen.getByRole('heading', {
        name: /inserisci i tuoi dati/i,
      });
      const resultsTitle = screen.getByRole('heading', {
        name: /risparmio stimato/i,
      });
      expect(inputTitle).toBeInTheDocument();
      expect(resultsTitle).toBeInTheDocument();
    });
  });

  describe('Input Controls', () => {
    it('renders hours slider with default value', () => {
      render(<ROICalculator />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('min', '1');
      expect(slider).toHaveAttribute('max', '40');
      expect(slider).toHaveValue('10');
    });

    it('renders task type dropdown button', () => {
      render(<ROICalculator />);
      const dropdown = screen.getByRole('button', {
        name: /tipo di attività principale/i,
      });
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('aria-expanded', 'false');
      expect(dropdown).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('renders hourly rate toggle', () => {
      render(<ROICalculator />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('renders hourly rate input with default value', () => {
      render(<ROICalculator />);
      const input = screen.getByRole('spinbutton', {
        name: /costo orario in euro/i,
      });
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(50);
    });
  });

  describe('User Interactions', () => {
    it('updates hours when slider changes', () => {
      render(<ROICalculator />);
      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '20' } });
      expect(slider).toHaveValue('20');
    });

    it('opens dropdown and shows task type options', () => {
      const { container } = render(<ROICalculator />);
      const dropdown = container.querySelector(
        '#task-type'
      ) as HTMLButtonElement;
      fireEvent.click(dropdown);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(6);
    });

    it('selects a task type from dropdown', () => {
      render(<ROICalculator />);
      // Open dropdown
      const dropdown = screen.getByRole('button', {
        name: /tipo di attività principale/i,
      });
      fireEvent.click(dropdown);

      // Select "Inserimento dati"
      const dataEntryOption = screen.getByRole('option', {
        name: /inserimento dati/i,
      });
      fireEvent.click(dataEntryOption);

      // Dropdown should close and show selected type text
      expect(dropdown).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByText('Inserimento dati')).toBeInTheDocument();
    });

    it('updates hourly rate input value', () => {
      render(<ROICalculator />);
      const input = screen.getByRole('spinbutton', {
        name: /costo orario in euro/i,
      });
      fireEvent.change(input, { target: { value: '100' } });
      expect(input).toHaveValue(100);
    });
  });

  describe('Results Display', () => {
    it('displays monthly hours result', () => {
      render(<ROICalculator />);
      expect(screen.getByText(/ore\/mese risparmiate/i)).toBeInTheDocument();
    });

    it('displays annual hours result', () => {
      render(<ROICalculator />);
      expect(screen.getByText(/ore\/anno risparmiate/i)).toBeInTheDocument();
    });

    it('displays annual savings result', () => {
      render(<ROICalculator />);
      expect(screen.getByText(/risparmio annuale/i)).toBeInTheDocument();
    });

    it('displays disclaimer text', () => {
      render(<ROICalculator />);
      expect(
        screen.getByText(/stima conservativa basata su/i)
      ).toBeInTheDocument();
    });

    it('displays insight text', () => {
      render(<ROICalculator />);
      expect(screen.getByText(/sapevi che/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on the section', () => {
      render(<ROICalculator />);
      const section = screen.getByRole('region', { name: /calcola il roi/i });
      expect(section).toHaveAttribute('aria-label', 'Calcola il ROI');
    });

    it('has decorative elements marked with aria-hidden', () => {
      const { container } = render(<ROICalculator />);
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });

    it('slider has proper aria attributes', () => {
      render(<ROICalculator />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '1');
      expect(slider).toHaveAttribute('aria-valuemax', '40');
      expect(slider).toHaveAttribute('aria-valuenow', '10');
    });

    it('CTA link points to contact section', () => {
      render(<ROICalculator />);
      const cta = screen.getByRole('link', { name: /parliamone/i });
      expect(cta).toHaveAttribute('href', '#contatti');
    });
  });
});
