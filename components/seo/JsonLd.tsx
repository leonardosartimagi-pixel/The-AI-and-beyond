import { SITE_URL, SITE_NAME } from '@/lib/constants';

interface JsonLdProps {
  locale: string;
}

export function JsonLd({ locale }: JsonLdProps) {
  const isItalian = locale === 'it';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: isItalian
      ? "Trasformiamo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende che vogliono crescere con l'intelligenza artificiale."
      : 'We turn ideas into AI solutions that work. Consulting and development for businesses looking to grow with artificial intelligence.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'English'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    description: isItalian
      ? "Consulenza e sviluppo AI per aziende che vogliono crescere con l'intelligenza artificiale."
      : 'AI consulting and development for businesses looking to grow with artificial intelligence.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    inLanguage: isItalian ? 'it-IT' : 'en-US',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isItalian
      ? 'Consulenza e Sviluppo AI'
      : 'AI Consulting & Development',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    description: isItalian
      ? 'Servizi di consulenza e sviluppo di soluzioni basate su intelligenza artificiale per aziende.'
      : 'Consulting services and development of artificial intelligence solutions for businesses.',
    areaServed: {
      '@type': 'Country',
      name: isItalian ? 'Italia' : 'Italy',
    },
    serviceType: isItalian
      ? [
          'Consulenza AI',
          'Sviluppo AI',
          'Automazione Processi',
          'Machine Learning',
        ]
      : [
          'AI Consulting',
          'AI Development',
          'Process Automation',
          'Machine Learning',
        ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
