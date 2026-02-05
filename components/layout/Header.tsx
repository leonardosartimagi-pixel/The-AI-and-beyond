'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button, LanguageSwitcher } from '@/components/ui';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NavGlitch } from '@/components/effects';
import { useScrollTo, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export const NAV_ITEMS = [
  { key: 'about', href: 'chi-sono' },
  { key: 'services', href: 'servizi' },
  { key: 'portfolio', href: 'portfolio' },
  { key: 'process', href: 'come-lavoro' },
  { key: 'contact', href: 'contatti' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTo = useScrollTo();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      scrollTo(href);
      setIsMobileMenuOpen(false);
    },
    [scrollTo]
  );

  const handleLogoClick = useCallback(() => scrollTo('hero'), [scrollTo]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          // Hardware acceleration for fixed positioning (better scroll performance)
          'transform-gpu will-change-transform',
          isScrolled
            ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm dark:shadow-gray-900/20'
            : 'bg-transparent'
        )}
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label={t('about')}
        >
          <Logo onClick={handleLogoClick} t={t} />
          <DesktopNav onNavClick={handleNavClick} t={t} />
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <DesktopCTA onClick={() => handleNavClick('contatti')} t={t} />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </nav>
      </motion.header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
}

interface LogoProps {
  onClick: () => void;
  t: ReturnType<typeof useTranslations<'nav'>>;
}

function Logo({ onClick, t }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={t('about')}
    >
      {/* Logo symbol - circular, without white background */}
      <Image
        src="/images/logo-symbol.png"
        alt="The AI and Beyond"
        fill
        sizes="48px"
        className="object-cover"
        priority
        placeholder="empty"
      />
    </button>
  );
}

interface DesktopNavProps {
  onNavClick: (href: string) => void;
  t: ReturnType<typeof useTranslations<'nav'>>;
}

function DesktopNav({ onNavClick, t }: DesktopNavProps) {
  return (
    <ul className="hidden items-center gap-8 lg:flex" role="list">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => onNavClick(item.href)}
            className="text-primary dark:text-gray-100 hover:text-accent dark:hover:text-accent-light transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 rounded px-2 py-1"
          >
            <NavGlitch>{t(item.key)}</NavGlitch>
          </button>
        </li>
      ))}
    </ul>
  );
}

interface DesktopCTAProps {
  onClick: () => void;
  t: ReturnType<typeof useTranslations<'nav'>>;
}

function DesktopCTA({ onClick, t }: DesktopCTAProps) {
  return (
    <Button onClick={onClick} size="sm">
      {t('cta')}
    </Button>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 rounded"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <motion.span
        className="block h-0.5 w-6 bg-primary dark:bg-gray-100"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-primary dark:bg-gray-100"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-primary dark:bg-gray-100"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}
