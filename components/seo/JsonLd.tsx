import { headers } from 'next/headers';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

interface JsonLdProps {
  locale: string;
}

export async function JsonLd({ locale }: JsonLdProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const isItalian = locale === 'it';

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          contentUrl: `${SITE_URL}/logo.png`,
          caption: SITE_NAME,
        },
        image: { '@id': `${SITE_URL}/#logo` },
        description: isItalian
          ? "Trasformiamo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende che vogliono crescere con l'intelligenza artificiale."
          : 'We turn ideas into AI solutions that work. Consulting and development for businesses looking to grow with artificial intelligence.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Genova 9',
          addressLocality: 'Viareggio',
          addressRegion: 'Toscana',
          postalCode: '55049',
          addressCountry: 'IT',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'info@theaiandbeyond.it',
          availableLanguage: ['Italian', 'English'],
        },
        sameAs: ['https://linkedin.com/in/leonardosartimagi'],
        founder: { '@id': `${SITE_URL}/#person` },
      },

      // Person (founder)
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Leonardo Sarti Magi',
        url: SITE_URL,
        image: `${SITE_URL}/images/about/profile.webp`,
        jobTitle: isItalian
          ? 'Consulente AI & Sviluppatore Software'
          : 'AI Consultant & Software Developer',
        worksFor: { '@id': `${SITE_URL}/#organization` },
        sameAs: ['https://linkedin.com/in/leonardosartimagi'],
      },

      // WebSite
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: isItalian
          ? "Consulenza e sviluppo AI per aziende che vogliono crescere con l'intelligenza artificiale."
          : 'AI consulting and development for businesses looking to grow with artificial intelligence.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['it-IT', 'en-US'],
      },

      // WebPage (current locale page)
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${locale}/#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: isItalian
          ? 'The AI and beyond — Consulenza AI che parte dal problema'
          : 'The AI and beyond — AI Consulting That Starts From the Problem',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: isItalian ? 'it-IT' : 'en-US',
      },

      // ProfessionalService (local business signals)
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        logo: { '@id': `${SITE_URL}/#logo` },
        description: isItalian
          ? 'Consulenza e sviluppo di soluzioni AI per aziende italiane.'
          : 'AI consulting and development for Italian businesses.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Genova 9',
          addressLocality: 'Viareggio',
          addressRegion: 'Toscana',
          postalCode: '55049',
          addressCountry: 'IT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.8675,
          longitude: 10.2488,
        },
        email: 'info@theaiandbeyond.it',
        priceRange: '€€',
        areaServed: {
          '@type': 'Country',
          name: isItalian ? 'Italia' : 'Italy',
        },
        sameAs: ['https://linkedin.com/in/leonardosartimagi'],
      },

      // Service
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service`,
        name: isItalian
          ? 'Consulenza e Sviluppo AI'
          : 'AI Consulting & Development',
        provider: { '@id': `${SITE_URL}/#organization` },
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
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graphSchema),
      }}
    />
  );
}
