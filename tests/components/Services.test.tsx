import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Services } from '@/components/sections/Services';

// Mock hooks — must provide all hooks used by Services and its children (ServiceModal)
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
  useFocusTrap: vi.fn(),
  useLenisControl: vi.fn(),
}));

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Section Structure', () => {
    it('renders the services section', () => {
      render(<Services />);
      const section = screen.getByRole('region', { name: /servizi/i });
      expect(section).toBeInTheDocument();
    });

    it('has the correct section id', () => {
      render(<Services />);
      const section = screen.getByRole('region', { name: /servizi/i });
      expect(section).toHaveAttribute('id', 'servizi');
    });

    it('displays the section label', () => {
      render(<Services />);
      expect(screen.getByText('Servizi')).toBeInTheDocument();
    });

    it('displays the main heading', () => {
      render(<Services />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(/cosa/i);
      expect(heading).toHaveTextContent(/facciamo/i);
    });

    it('displays the section description', () => {
      render(<Services />);
      expect(
        screen.getByText(/ogni azienda ha processi che funzionano male/i)
      ).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Services className="custom-class" />);
      const section = screen.getByRole('region', { name: /servizi/i });
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Service Cards', () => {
    it('renders all 5 service cards', () => {
      render(<Services />);
      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(5);
    });

    it('displays Strategia AI service', () => {
      render(<Services />);
      expect(screen.getByText('Strategia AI')).toBeInTheDocument();
      expect(
        screen.getByText(/mappa chiara su dove l'ai fa la differenza/i)
      ).toBeInTheDocument();
    });

    it('displays Sviluppo Su Misura service', () => {
      render(<Services />);
      expect(screen.getByText('Sviluppo Su Misura')).toBeInTheDocument();
      expect(
        screen.getByText(/strumenti costruiti intorno a come il tuo team/i)
      ).toBeInTheDocument();
    });

    it('displays Automazione Intelligente service', () => {
      render(<Services />);
      expect(screen.getByText('Automazione Intelligente')).toBeInTheDocument();
      expect(
        screen.getByText(/agenti ai che gestiscono task ripetitivi/i)
      ).toBeInTheDocument();
    });

    it('displays Validazione Rapida service', () => {
      render(<Services />);
      expect(screen.getByText('Validazione Rapida')).toBeInTheDocument();
      expect(
        screen.getByText(/mvp funzionante in 3-4 settimane/i)
      ).toBeInTheDocument();
    });

    it('displays Ottimizzazione Operativa service', () => {
      render(<Services />);
      expect(screen.getByText('Ottimizzazione Operativa')).toBeInTheDocument();
      expect(
        screen.getByText(/strumenti ai integrati nel workflow/i)
      ).toBeInTheDocument();
    });

    it('each card has a "Scopri di più" CTA', () => {
      render(<Services />);
      const ctaLinks = screen.getAllByText('Scopri di più');
      expect(ctaLinks).toHaveLength(5);
    });

    it('cards have accessible button labels', () => {
      render(<Services />);
      expect(
        screen.getByLabelText(/scopri di più - strategia ai/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/scopri di più - sviluppo su misura/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/scopri di più - automazione intelligente/i)
      ).toBeInTheDocument();
    });
  });

  describe('Service Icons', () => {
    it('renders icons with aria-hidden', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThanOrEqual(5);
    });

    it('icons are contained in styled containers', () => {
      const { container } = render(<Services />);
      const iconContainers = container.querySelectorAll(
        '.rounded-xl.bg-gradient-to-br'
      );
      expect(iconContainers.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Modal Functionality', () => {
    it('opens modal when card is clicked', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });

    it('modal displays service title', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const modal = screen.getByRole('dialog');
      expect(within(modal).getByText('Strategia AI')).toBeInTheDocument();
    });

    it('modal displays problem and outcome sections', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      expect(screen.getByText('Il problema')).toBeInTheDocument();
      expect(screen.getByText('Cosa cambia dopo')).toBeInTheDocument();
      expect(screen.getByText('Perché è diverso')).toBeInTheDocument();
    });

    it('modal has close button', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const closeButton = screen.getByLabelText(/chiudi/i);
      expect(closeButton).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const closeButton = screen.getByLabelText(/chiudi/i);
      fireEvent.click(closeButton);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('modal has CTA button linking to contacts', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const ctaLink = screen.getByRole('link', { name: /parliamone/i });
      expect(ctaLink).toHaveAttribute('href', '#contatti');
    });

    it('closes modal when backdrop is clicked', () => {
      const { container } = render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const backdrop = container.querySelector('.backdrop-blur-sm');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      }
    });
  });

  describe('Layout', () => {
    it('uses grid layout for cards', () => {
      const { container } = render(<Services />);
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
    });

    it('has responsive grid columns', () => {
      const { container } = render(<Services />);
      const gridContainer = container.querySelector('.lg\\:grid-cols-3');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Decorative Elements', () => {
    it('has decorative gradient blur elements', () => {
      const { container } = render(<Services />);
      const blurElements = container.querySelectorAll('.blur-3xl');
      expect(blurElements.length).toBeGreaterThanOrEqual(2);
    });

    it('section label has decorative lines', () => {
      const { container } = render(<Services />);
      const labelLines = container.querySelectorAll('.h-px.w-8.bg-accent');
      expect(labelLines.length).toBe(2);
    });

    it('heading has underline accent', () => {
      const { container } = render(<Services />);
      const headingAccent = container.querySelector(
        '.h-1.w-full.bg-gradient-to-r.from-accent'
      );
      expect(headingAccent).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('section has proper aria-label', () => {
      render(<Services />);
      const section = screen.getByRole('region', { name: /servizi/i });
      expect(section).toHaveAttribute('aria-label', 'Servizi');
    });

    it('modal has proper aria attributes', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'service-modal-title');
    });

    it('decorative elements have aria-hidden', () => {
      const { container } = render(<Services />);
      const decorativeBlurs = container.querySelectorAll(
        '.blur-3xl[aria-hidden="true"]'
      );
      expect(decorativeBlurs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Responsive Design', () => {
    it('has mobile-friendly stacking classes', () => {
      const { container } = render(<Services />);
      const gridContainer = container.querySelector('.sm\\:grid-cols-2');
      expect(gridContainer).toBeInTheDocument();
    });

    it('has responsive padding', () => {
      const { container } = render(<Services />);
      const innerContainer = container.querySelector('.sm\\:px-6.lg\\:px-8');
      expect(innerContainer).toBeInTheDocument();
    });

    it('has responsive section padding', () => {
      render(<Services />);
      const section = screen.getByRole('region', { name: /servizi/i });
      expect(section).toHaveClass('py-24', 'lg:py-32');
    });
  });

  describe('Content Accuracy', () => {
    it('all service titles match requirements', () => {
      render(<Services />);
      const expectedTitles = [
        'Strategia AI',
        'Sviluppo Su Misura',
        'Automazione Intelligente',
        'Validazione Rapida',
        'Ottimizzazione Operativa',
      ];
      expectedTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('modal title has correct ID for aria-labelledby', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più - strategia ai/i
      );
      fireEvent.click(consulenzaButton);

      const modalTitle = screen.getByRole('heading', {
        level: 2,
        name: /strategia ai/i,
      });
      expect(modalTitle).toHaveAttribute('id', 'service-modal-title');
    });

    it('displays bridge narrative text', () => {
      render(<Services />);
      expect(
        screen.getByText(/non sono categorie rigide/i)
      ).toBeInTheDocument();
    });
  });
});
