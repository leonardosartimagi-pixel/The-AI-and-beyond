'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { useScrollTo, useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

export const NAV_ITEMS = [
  { label: 'Chi Sono', href: 'chi-sono' },
  { label: 'Servizi', href: 'servizi' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Come Lavoro', href: 'come-lavoro' },
  { label: 'Contatti', href: 'contatti' },
] as const;

export function Header() {
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
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navigazione principale"
        >
          <Logo onClick={handleLogoClick} />
          <DesktopNav onNavClick={handleNavClick} />
          <DesktopCTA onClick={() => handleNavClick('contatti')} />
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
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
}

function Logo({ onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="relative h-10 w-10 md:h-12 md:w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
      aria-label="Torna alla home"
    >
      <Image
        src="/images/onda_logo.png"
        alt="The AI and Beyond"
        fill
        sizes="40px"
        className="object-contain md:hidden"
        priority
        placeholder="empty"
      />
      <Image
        src="/images/logo.png"
        alt="The AI and Beyond"
        fill
        sizes="(min-width: 768px) 160px, 40px"
        className="hidden object-contain md:block"
        priority
        placeholder="empty"
      />
    </button>
  );
}

interface DesktopNavProps {
  onNavClick: (href: string) => void;
}

function DesktopNav({ onNavClick }: DesktopNavProps) {
  return (
    <ul className="hidden items-center gap-8 lg:flex" role="list">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => onNavClick(item.href)}
            className="text-primary hover:text-accent transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded px-2 py-1"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

interface DesktopCTAProps {
  onClick: () => void;
}

function DesktopCTA({ onClick }: DesktopCTAProps) {
  return (
    <div className="hidden lg:block">
      <Button onClick={onClick} size="sm">
        Parliamone
      </Button>
    </div>
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
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
      aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={isOpen}
    >
      <motion.span
        className="block h-0.5 w-6 bg-primary"
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-primary"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-primary"
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}
