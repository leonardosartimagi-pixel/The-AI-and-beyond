import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header, NAV_ITEMS } from '@/components/layout/Header';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    render(<Header />);
    const logos = screen.getAllByAltText('The AI and beyond');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders navigation links on desktop', () => {
    render(<Header />);
    expect(NAV_ITEMS.length).toBe(6);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders the Parliamone CTA button', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /parliamone/i })
    ).toBeInTheDocument();
  });

  it('renders hamburger menu button', () => {
    render(<Header />);
    // Now uses translated aria-label: 'Apri menu' (from t('openMenu'))
    expect(
      screen.getByRole('button', { name: /apri menu/i })
    ).toBeInTheDocument();
  });

  it('has navigation element with proper label', () => {
    render(<Header />);
    // Now uses t('mainNav') = 'Navigazione principale'
    expect(
      screen.getByRole('navigation', { name: /navigazione principale/i })
    ).toBeInTheDocument();
  });

  it('logo has accessible home label', () => {
    render(<Header />);
    // Now uses t('home') = 'Torna alla home'
    expect(
      screen.getByRole('button', { name: /torna alla home/i })
    ).toBeInTheDocument();
  });

  it('hamburger button toggles aria-expanded', () => {
    render(<Header />);
    const hamburger = screen.getByRole('button', { name: /apri menu/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(hamburger);

    // After click, aria-label changes to "Chiudi menu" and aria-expanded to "true"
    const toggledButton = screen.getByRole('button', { name: /chiudi menu/i });
    expect(toggledButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('exports NAV_ITEMS constant', () => {
    expect(NAV_ITEMS).toHaveLength(6);
    expect(NAV_ITEMS[0]).toEqual({ key: 'about', href: 'chi-siamo' });
    expect(NAV_ITEMS[1]).toEqual({ key: 'innovation', href: 'innovazione' });
  });
});
