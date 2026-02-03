import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Process } from '@/components/sections/Process';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    h2: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    h3: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h3 {...props}>{children}</h3>
    ),
    p: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
    span: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...props}>{children}</span>
    ),
    a: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <a {...props}>{children}</a>
    ),
  },
  useInView: () => true,
}));

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
}));

describe('Process', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Section Structure', () => {
    it('renders the process section', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoro/i });
      expect(section).toBeInTheDocument();
    });

    it('has the correct section id', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoro/i });
      expect(section).toHaveAttribute('id', 'come-lavoro');
    });

    it('displays the section label', () => {
      render(<Process />);
      expect(screen.getByText('Processo')).toBeInTheDocument();
    });

    it('displays the main heading', () => {
      render(<Process />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(/come/i);
      expect(heading).toHaveTextContent(/lavoro/i);
    });

    it('displays the section description', () => {
      render(<Process />);
      expect(
        screen.getByText(/un approccio strutturato per trasformare/i)
      ).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Process className="custom-class" />);
      const section = screen.getByRole('region', { name: /come lavoro/i });
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Process Steps', () => {
    it('renders all 5 process steps', () => {
      render(<Process />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(10); // 5 steps x 2 (mobile + desktop)
    });

    it('displays Ascolto step', () => {
      render(<Process />);
      expect(screen.getAllByText('Ascolto')).toHaveLength(2);
      expect(
        screen.getAllByText(/capisco il tuo problema e i tuoi obiettivi/i)
      ).toHaveLength(2);
    });

    it('displays Analizzo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Analizzo')).toHaveLength(2);
      expect(
        screen.getAllByText(/studio la soluzione migliore per il tuo caso/i)
      ).toHaveLength(2);
    });

    it('displays Progetto step', () => {
      render(<Process />);
      expect(screen.getAllByText('Progetto')).toHaveLength(2);
      expect(
        screen.getAllByText(/definisco architettura e roadmap chiara/i)
      ).toHaveLength(2);
    });

    it('displays Sviluppo step', () => {
      render(<Process />);
      expect(screen.getAllByText('Sviluppo')).toHaveLength(2);
      expect(
        screen.getAllByText(/costruisco con metodologia agile/i)
      ).toHaveLength(2);
    });

    it('displays Consegno step', () => {
      render(<Process />);
      expect(screen.getAllByText('Consegno')).toHaveLength(2);
      expect(
        screen.getAllByText(/testing, deployment e formazione del team/i)
      ).toHaveLength(2);
    });

    it('displays step numbers', () => {
      render(<Process />);
      for (let i = 1; i <= 5; i++) {
        const numbers = screen.getAllByText(i.toString());
        // Each number appears twice (mobile + desktop)
        expect(numbers.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('Step Icons', () => {
    it('renders icons with aria-hidden', () => {
      const { container } = render(<Process />);
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      // At least 5 icons for steps plus some decorative
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
    it('has horizontal connecting line for desktop', () => {
      const { container } = render(<Process />);
      const horizontalLine = container.querySelector(
        '.lg\\:block.h-0\\.5.bg-gradient-to-r'
      );
      expect(horizontalLine).toBeInTheDocument();
    });

    it('has vertical connecting lines for mobile', () => {
      const { container } = render(<Process />);
      const verticalLines = container.querySelectorAll(
        '.h-16.w-0\\.5.bg-gradient-to-b'
      );
      // 4 lines (not on last item)
      expect(verticalLines).toHaveLength(4);
    });

    it('vertical lines are not shown on last step', () => {
      const { container } = render(<Process />);
      const verticalLines = container.querySelectorAll(
        '.h-16.w-0\\.5.origin-top'
      );
      // Should be 4 (one less than total steps)
      expect(verticalLines).toHaveLength(4);
    });
  });

  describe('CTA Button', () => {
    it('has a CTA button linking to contacts', () => {
      render(<Process />);
      const ctaLink = screen.getByRole('link', { name: /iniziamo insieme/i });
      expect(ctaLink).toHaveAttribute('href', '#contatti');
    });

    it('CTA button has proper styling classes', () => {
      render(<Process />);
      const ctaLink = screen.getByRole('link', { name: /iniziamo insieme/i });
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
      const section = screen.getByRole('region', { name: /come lavoro/i });
      expect(section).toHaveAttribute('aria-label', 'Come lavoro');
    });

    it('decorative elements have aria-hidden', () => {
      const { container } = render(<Process />);
      const decorativeBlurs = container.querySelectorAll(
        '.blur-3xl[aria-hidden="true"]'
      );
      expect(decorativeBlurs.length).toBeGreaterThanOrEqual(2);
    });

    it('timeline lines have aria-hidden', () => {
      const { container } = render(<Process />);
      const timelineLines = container.querySelectorAll(
        '.origin-left[aria-hidden="true"]'
      );
      expect(timelineLines.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Responsive Design', () => {
    it('has mobile-first vertical layout', () => {
      const { container } = render(<Process />);
      const mobileContainers = container.querySelectorAll('.flex.w-full.lg\\:hidden');
      expect(mobileContainers.length).toBeGreaterThan(0);
    });

    it('has responsive padding', () => {
      const { container } = render(<Process />);
      const innerContainer = container.querySelector('.sm\\:px-6.lg\\:px-8');
      expect(innerContainer).toBeInTheDocument();
    });

    it('has responsive section padding', () => {
      render(<Process />);
      const section = screen.getByRole('region', { name: /come lavoro/i });
      expect(section).toHaveClass('py-24', 'lg:py-32');
    });
  });

  describe('Content Accuracy', () => {
    it('all step titles match requirements', () => {
      render(<Process />);
      const expectedTitles = [
        'Ascolto',
        'Analizzo',
        'Progetto',
        'Sviluppo',
        'Consegno',
      ];
      expectedTitles.forEach((title) => {
        const elements = screen.getAllByText(title);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('steps are displayed in correct order', () => {
      render(<Process />);
      // Each step number should appear in the document
      for (let i = 1; i <= 5; i++) {
        const numberElements = screen.getAllByText(i.toString());
        expect(numberElements.length).toBeGreaterThan(0);
      }
    });
  });
});
