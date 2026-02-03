import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Services } from '@/components/sections/Services';

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
    article: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article {...props}>{children}</article>
    ),
    button: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
}));

// Mock hooks
vi.mock('@/hooks', () => ({
  useReducedMotion: () => false,
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
      expect(heading).toHaveTextContent(/soluzioni ai/i);
      expect(heading).toHaveTextContent(/su misura/i);
    });

    it('displays the section description', () => {
      render(<Services />);
      expect(
        screen.getByText(/dall'idea alla realizzazione/i)
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

    it('displays Consulenza AI service', () => {
      render(<Services />);
      expect(screen.getByText('Consulenza AI')).toBeInTheDocument();
      expect(
        screen.getByText(/analisi e strategia per integrare ai/i)
      ).toBeInTheDocument();
    });

    it('displays Sviluppo Web App service', () => {
      render(<Services />);
      expect(screen.getByText('Sviluppo Web App')).toBeInTheDocument();
      expect(
        screen.getByText(/applicazioni web moderne e performanti/i)
      ).toBeInTheDocument();
    });

    it('displays Agenti AI service', () => {
      render(<Services />);
      expect(screen.getByText('Agenti AI')).toBeInTheDocument();
      expect(
        screen.getByText(/automazioni intelligenti e assistenti virtuali/i)
      ).toBeInTheDocument();
    });

    it('displays Prototipi Rapidi service', () => {
      render(<Services />);
      expect(screen.getByText('Prototipi Rapidi')).toBeInTheDocument();
      expect(
        screen.getByText(/mvp e proof of concept in tempi brevi/i)
      ).toBeInTheDocument();
    });

    it('displays Ottimizzazione PM service', () => {
      render(<Services />);
      expect(screen.getByText('Ottimizzazione PM')).toBeInTheDocument();
      expect(
        screen.getByText(/strumenti ai per project management efficiente/i)
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
        screen.getByLabelText(/scopri di più su consulenza ai/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/scopri di più su sviluppo web app/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/scopri di più su agenti ai/i)
      ).toBeInTheDocument();
    });
  });

  describe('Service Icons', () => {
    it('renders icons with aria-hidden', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      // At least 5 icons for cards plus some decorative
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
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      // Modal should be open with dialog role
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });

    it('modal displays service title', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const modal = screen.getByRole('dialog');
      expect(within(modal).getByText('Consulenza AI')).toBeInTheDocument();
    });

    it('modal displays expanded description', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      expect(
        screen.getByText(/valutiamo insieme il tuo contesto aziendale/i)
      ).toBeInTheDocument();
    });

    it('modal has close button', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const closeButton = screen.getByLabelText(/chiudi/i);
      expect(closeButton).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const closeButton = screen.getByLabelText(/chiudi/i);
      fireEvent.click(closeButton);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('modal has CTA button linking to contacts', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const ctaLink = screen.getByRole('link', { name: /parliamone/i });
      expect(ctaLink).toHaveAttribute('href', '#contatti');
    });

    it('closes modal when backdrop is clicked', () => {
      const { container } = render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      // Find backdrop by class
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

    it('featured cards have different min-height', () => {
      const { container } = render(<Services />);
      const featuredCards = container.querySelectorAll('.min-h-\\[320px\\]');
      // 2 featured cards: Consulenza AI and Agenti AI
      expect(featuredCards.length).toBeGreaterThanOrEqual(2);
    });

    it('normal cards have standard min-height', () => {
      const { container } = render(<Services />);
      const normalCards = container.querySelectorAll('.min-h-\\[240px\\]');
      // 3 normal cards
      expect(normalCards.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Decorative Elements', () => {
    it('has decorative gradient blur elements', () => {
      const { container } = render(<Services />);
      const blurElements = container.querySelectorAll('.blur-3xl');
      expect(blurElements.length).toBeGreaterThanOrEqual(2);
    });

    it('has decorative dot pattern', () => {
      const { container } = render(<Services />);
      const dotPattern = container.querySelector('.lg\\:block.opacity-\\[0\\.03\\]');
      expect(dotPattern).toBeInTheDocument();
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
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('cards are keyboard accessible', () => {
      render(<Services />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
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
      const gridContainer = container.querySelector('.md\\:grid-cols-2');
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
        'Consulenza AI',
        'Sviluppo Web App',
        'Agenti AI',
        'Prototipi Rapidi',
        'Ottimizzazione PM',
      ];
      expectedTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('modal title has correct ID for aria-labelledby', () => {
      render(<Services />);
      const consulenzaButton = screen.getByLabelText(
        /scopri di più su consulenza ai/i
      );
      fireEvent.click(consulenzaButton);

      const modalTitle = screen.getByRole('heading', { level: 2, name: /consulenza ai/i });
      expect(modalTitle).toHaveAttribute('id', 'modal-title');
    });
  });
});
