'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useScrollTo } from '@/hooks';
import { useConsentStorage } from '@/hooks/useConsentStorage';

const NAV_KEYS = ['about', 'services', 'portfolio', 'process', 'contact'] as const;
const QUICK_LINKS = [
  { key: 'about', href: 'chi-siamo' },
  { key: 'services', href: 'servizi' },
  { key: 'portfolio', href: 'portfolio' },
  { key: 'process', href: 'come-lavoriamo' },
  { key: 'contact', href: 'contatti' },
] as const;

const CONTACT_INFO = {
  email: 'info@theaiandbeyond.it',
  linkedIn: 'https://linkedin.com/in/leonardosartimagi',
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const scrollTo = useScrollTo();
  const { resetConsent } = useConsentStorage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white border-t border-transparent dark:border-gray-800" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FooterBrand onLogoClick={() => scrollTo('hero')} t={t} />
          <FooterNav onNavClick={scrollTo} t={t} tNav={tNav} />
          <FooterContact t={t} />
          <FooterLegal t={t} />
        </div>
        <FooterBottom year={currentYear} t={t} locale={locale} onManageCookies={resetConsent} />
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
        className="relative h-12 w-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        aria-label="Home"
      >
        <Image
          src="/images/logo-full-white.svg"
          alt="The AI and Beyond"
          fill
          className="object-contain"
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

interface FooterLegalProps {
  t: ReturnType<typeof useTranslations<'footer'>>;
}

function FooterLegal({ t }: FooterLegalProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold mb-4">{t('legalTitle')}</h3>
      <ul className="space-y-2 text-sm text-white/80" role="list">
        <li>{t('address')}</li>
        <li>{t('piva')}</li>
      </ul>
    </div>
  );
}

interface FooterBottomProps {
  year: number;
  t: ReturnType<typeof useTranslations<'footer'>>;
  locale: string;
  onManageCookies: () => void;
}

function FooterBottom({ year, t, locale, onManageCookies }: FooterBottomProps) {
  const linkClass = "text-sm text-white/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded";

  return (
    <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <p className="text-sm text-white/60">
        {t('copyright', { year })}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={`/${locale}/privacy`} className={linkClass}>
          {t('privacy')}
        </Link>
        <Link href={`/${locale}/cookie-policy`} className={linkClass}>
          {t('cookiePolicy')}
        </Link>
        <Link href={`/${locale}/terms`} className={linkClass}>
          {t('terms')}
        </Link>
        <button
          type="button"
          onClick={onManageCookies}
          className={linkClass}
        >
          {t('manageCookies')}
        </button>
      </div>
    </div>
  );
}
