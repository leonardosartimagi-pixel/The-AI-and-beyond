'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollTo } from '@/hooks';

const NAV_KEYS = ['about', 'services', 'portfolio', 'process', 'contact'] as const;
const QUICK_LINKS = [
  { key: 'about', href: 'chi-sono' },
  { key: 'services', href: 'servizi' },
  { key: 'portfolio', href: 'portfolio' },
  { key: 'process', href: 'come-lavoro' },
  { key: 'contact', href: 'contatti' },
] as const;

const CONTACT_INFO = {
  email: 'info@theaiandbeyond.it',
  linkedIn: 'https://linkedin.com/in/leonardosartimagi',
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const scrollTo = useScrollTo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <FooterBrand onLogoClick={() => scrollTo('hero')} t={t} />
          <FooterNav onNavClick={scrollTo} t={t} tNav={tNav} />
          <FooterContact t={t} />
        </div>
        <FooterBottom year={currentYear} t={t} />
      </div>
    </footer>
  );
}

interface FooterBrandProps {
  onLogoClick: () => void;
  t: ReturnType<typeof useTranslations<'footer'>>;
}

function FooterBrand({ onLogoClick, t }: FooterBrandProps) {
  return (
    <div>
      <button
        onClick={onLogoClick}
        className="relative h-10 w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        aria-label="Home"
      >
        <Image
          src="/images/logo.png"
          alt="The AI and Beyond"
          fill
          className="object-contain brightness-0 invert"
        />
      </button>
      <p className="mt-4 text-sm text-white/80">
        {t('description')}
      </p>
    </div>
  );
}

interface FooterNavProps {
  onNavClick: (href: string) => void;
  t: ReturnType<typeof useTranslations<'footer'>>;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}

function FooterNav({ onNavClick, t, tNav }: FooterNavProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold mb-4">{t('quickLinks')}</h3>
      <ul className="space-y-2" role="list">
        {QUICK_LINKS.map((link) => (
          <li key={link.href}>
            <button
              onClick={() => onNavClick(link.href)}
              className="text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            >
              {tNav(link.key)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FooterContactProps {
  t: ReturnType<typeof useTranslations<'footer'>>;
}

function FooterContact({ t }: FooterContactProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold mb-4">{t('contactTitle')}</h3>
      <ul className="space-y-2" role="list">
        <li>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            {CONTACT_INFO.email}
          </a>
        </li>
        <li>
          <a
            href={CONTACT_INFO.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          >
            {t('linkedin')}
          </a>
        </li>
      </ul>
    </div>
  );
}

interface FooterBottomProps {
  year: number;
  t: ReturnType<typeof useTranslations<'footer'>>;
}

function FooterBottom({ year, t }: FooterBottomProps) {
  return (
    <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm text-white/60">
        {t('copyright', { year })}
      </p>
      <a
        href="/privacy"
        className="text-sm text-white/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
      >
        {t('privacy')}
      </a>
    </div>
  );
}
