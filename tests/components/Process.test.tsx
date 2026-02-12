import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Process } from '@/components/sections/Process';

// Mock hooks — must provide useActiveStep used by Process
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
  useActiveStep: () => ({ activeStep: 0, progress: 0 }),
}));

describe('Process', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Section Structure', () => {
    it('renders the process section', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoriamo/i });
      expect(section).toBeInTheDocument();
    });

    it('has the correct section id', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoriamo/i });
      expect(section).toHaveAttribute('id', 'come-lavoriamo');
    });

    it('displays the section label', () => {
      render(<Process />);
      expect(screen.getByText('Come Lavoriamo')).toBeInTheDocument();
    });

    it('displays the main heading', () => {
      render(<Process />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(/un processo/i);
      expect(heading).toHaveTextContent(/trasparente/i);
    });

    it('displays the section description', () => {
      render(<Process />);
      expect(
        screen.getByText(/dalla prima chiamata alla consegna/i)
      ).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Process className="custom-class" />);
      const section = screen.getByRole('region', { name: /come lavoriamo/i });
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Process Steps', () => {
    it('renders all 5 process steps', () => {
      render(<Process />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      // 5 steps x 2 (mobile + desktop layout)
      expect(headings).toHaveLength(10);
    });

    it('displays Ascoltiamo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Ascoltiamo')).toHaveLength(2);
      expect(
        screen.getAllByText(/prima di tutto, capiamo il contesto/i)
      ).toHaveLength(2);
    });

    it('displays Analizziamo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Analizziamo')).toHaveLength(2);
      expect(screen.getAllByText(/studiamo i dati, i flussi/i)).toHaveLength(2);
    });

    it('displays Progettiamo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Progettiamo')).toHaveLength(2);
      expect(
        screen.getAllByText(/definiamo architettura, strumenti, tempi/i)
      ).toHaveLength(2);
    });

    it('displays Sviluppiamo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Sviluppiamo')).toHaveLength(2);
      expect(
        screen.getAllByText(/costruiamo con metodologia agile/i)
      ).toHaveLength(2);
    });

    it('displays Consegniamo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Consegniamo')).toHaveLength(2);
      expect(
        screen.getAllByText(/testing, deployment, documentazione/i)
      ).toHaveLength(2);
    });

    it('displays step numbers', () => {
      render(<Process />);
      for (let i = 1; i <= 5; i++) {
        const numbers = screen.getAllByText(i.toString());
        // Each number appears at least twice (mobile + desktop)
        expect(numbers.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('Step Icons', () => {
    it('renders step icons', () => {
      const { container } = render(<Process />);
      const icons = container.querySelectorAll('svg.animated-svg-icon');
      expect(icons.length).toBeGreaterThanOrEqual(5);
    });

    it('icons are contained in styled containers', () => {
      const { container } = render(<Process />);
      const iconContainers = container.querySelectorAll(
        '.rounded-full.bg-gradient-to-br'
      );
      expect(iconContainers.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Timeline Visual Elements', () => {
    it('has vertical connecting lines for mobile', () => {
      const { container } = render(<Process />);
      const verticalLines = container.querySelectorAll('.h-16.w-0\\.5');
      // 4 lines (not on last item), mobile layout
      expect(verticalLines).toHaveLength(4);
    });
  });

  describe('CTA Button', () => {
    it('has a CTA button linking to contacts', () => {
      render(<Process />);
      const ctaLink = screen.getByRole('link', { name: /parliamone/i });
      expect(ctaLink).toHaveAttribute('href', '#contatti');
    });

    it('CTA button has proper styling classes', () => {
      render(<Process />);
      const ctaLink = screen.getByRole('link', { name: /parliamone/i });
      expect(ctaLink).toHaveClass('rounded-xl');
      expect(ctaLink).toHaveClass('bg-gradient-to-r');
    });
  });

  describe('Layout', () => {
    it('uses grid layout for steps on desktop', () => {
      const { container } = render(<Process />);
      const gridContainer = container.querySelector('.lg\\:grid-cols-5');
      expect(gridContainer).toBeInTheDocument();
    });

    it('has responsive layout with mobile vertical display', () => {
      const { container } = render(<Process />);
      const mobileLayout = container.querySelectorAll('.lg\\:hidden');
      expect(mobileLayout.length).toBeGreaterThan(0);
    });

    it('has desktop card layout', () => {
      const { container } = render(<Process />);
      const desktopLayout = container.querySelectorAll('.hidden.lg\\:block');
      expect(desktopLayout.length).toBeGreaterThan(0);
    });
  });

  describe('Decorative Elements', () => {
    it('has decorative gradient blur elements', () => {
      const { container } = render(<Process />);
      const blurElements = container.querySelectorAll('.blur-3xl');
      expect(blurElements.length).toBeGreaterThanOrEqual(2);
    });

    it('section label has decorative lines', () => {
      const { container } = render(<Process />);
      const labelLines = container.querySelectorAll('.h-px.w-8.bg-accent');
      expect(labelLines.length).toBe(2);
    });

    it('heading has underline accent', () => {
      const { container } = render(<Process />);
      const headingAccent = container.querySelector(
        '.h-1.w-full.bg-gradient-to-r.from-accent'
      );
      expect(headingAccent).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('section has proper aria-label', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoriamo/i });
      expect(section).toHaveAttribute('aria-label', 'Come Lavoriamo');
    });

    it('decorative elements have aria-hidden', () => {
      const { container } = render(<Process />);
      const decorativeBlurs = container.querySelectorAll(
        '.blur-3xl[aria-hidden="true"]'
      );
      expect(decorativeBlurs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding', () => {
      const { container } = render(<Process />);
      const innerContainer = container.querySelector('.sm\\:px-6.lg\\:px-8');
      expect(innerContainer).toBeInTheDocument();
    });

    it('has responsive section padding', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoriamo/i });
      expect(section).toHaveClass('py-24', 'lg:py-32');
    });
  });

  describe('Content Accuracy', () => {
    it('all step titles match requirements', () => {
      render(<Process />);
      const expectedTitles = [
        'Ascoltiamo',
        'Analizziamo',
        'Progettiamo',
        'Sviluppiamo',
        'Consegniamo',
      ];
      expectedTitles.forEach((title) => {
        const elements = screen.getAllByText(title);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('displays closing note text', () => {
      render(<Process />);
      expect(screen.getByText(/ogni progetto è diverso/i)).toBeInTheDocument();
    });
  });
});
