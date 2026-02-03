'use client';

import Image from 'next/image';
import { useScrollTo } from '@/hooks';

const QUICK_LINKS = [
  { label: 'Chi Sono', href: 'chi-sono' },
  { label: 'Servizi', href: 'servizi' },
  { label: 'Portfolio', href: 'portfolio' },
  { label: 'Come Lavoro', href: 'come-lavoro' },
  { label: 'Contatti', href: 'contatti' },
] as const;

const CONTACT_INFO = {
  email: 'info@theaiandbeyond.it',
  linkedIn: 'https://linkedin.com/in/leonardosartimagi',
};

export function Footer() {
  const scrollTo = useScrollTo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <FooterBrand onLogoClick={() => scrollTo('hero')} />
          <FooterNav onNavClick={scrollTo} />
          <FooterContact />
        </div>
        <FooterBottom year={currentYear} />
      </div>
    </footer>
  );
}

interface FooterBrandProps {
  onLogoClick: () => void;
}

function FooterBrand({ onLogoClick }: FooterBrandProps) {
  return (
    <div>
      <button
        onClick={onLogoClick}
        className="relative h-10 w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        aria-label="Torna alla home"
      >
        <Image
          src="/images/logo.png"
          alt="The AI and Beyond"
          fill
          className="object-contain brightness-0 invert"
        />
      </button>
      <p className="mt-4 text-sm text-white/70">
        Consulenza AI e sviluppo web per aziende italiane.
      </p>
    </div>
  );
}

interface FooterNavProps {
  onNavClick: (href: string) => void;
}

function FooterNav({ onNavClick }: FooterNavProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold mb-4">Link Rapidi</h3>
      <ul className="space-y-2" role="list">
        {QUICK_LINKS.map((link) => (
          <li key={link.href}>
            <button
              onClick={() => onNavClick(link.href)}
              className="text-white/70 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact() {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold mb-4">Contatti</h3>
      <ul className="space-y-2" role="list">
        <li>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-white/70 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            {CONTACT_INFO.email}
          </a>
        </li>
        <li>
          <a
            href={CONTACT_INFO.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}

interface FooterBottomProps {
  year: number;
}

function FooterBottom({ year }: FooterBottomProps) {
  return (
    <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm text-white/50">
        &copy; {year} The AI and Beyond. Tutti i diritti riservati.
      </p>
      <a
        href="/privacy"
        className="text-sm text-white/50 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
      >
        Privacy Policy
      </a>
    </div>
  );
}
