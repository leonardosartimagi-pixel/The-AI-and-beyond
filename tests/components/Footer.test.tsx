import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders the logo', () => {
    render(<Footer />);
    expect(screen.getByAltText('The AI and beyond')).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    render(<Footer />);
    expect(screen.getByText('Link Rapidi')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Chi Siamo' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Servizi' })).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', { name: 'Contatti' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /info@theaiandbeyond/i })
    ).toBeInTheDocument();
  });

  it('renders LinkedIn link with security attributes', () => {
    render(<Footer />);
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });

  it('renders Privacy Policy link', () => {
    render(<Footer />);
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toHaveAttribute('href', '/it/privacy');
  });

  it('has contentinfo role', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders all five quick links', () => {
    render(<Footer />);
    const quickLinks = [
      'Chi Siamo',
      'Servizi',
      'Portfolio',
      'Come Lavoriamo',
      'Contatti',
    ];
    quickLinks.forEach((link) => {
      expect(screen.getByRole('button', { name: link })).toBeInTheDocument();
    });
  });

  it('email link has correct mailto href', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', {
      name: /info@theaiandbeyond/i,
    });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@theaiandbeyond.it');
  });
});
