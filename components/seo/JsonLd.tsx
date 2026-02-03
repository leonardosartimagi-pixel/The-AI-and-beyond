export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The AI and Beyond',
    url: 'https://theaiandbeyond.it',
    logo: 'https://theaiandbeyond.it/logo.png',
    description:
      "Trasformo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende italiane che vogliono crescere con l'intelligenza artificiale.",
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
    name: 'The AI and Beyond',
    url: 'https://theaiandbeyond.it',
    description:
      "Consulenza e sviluppo AI per aziende italiane che vogliono crescere con l'intelligenza artificiale.",
    publisher: {
      '@type': 'Organization',
      name: 'The AI and Beyond',
    },
    inLanguage: 'it-IT',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Consulenza e Sviluppo AI',
    provider: {
      '@type': 'Organization',
      name: 'The AI and Beyond',
    },
    description:
      'Servizi di consulenza e sviluppo di soluzioni basate su intelligenza artificiale per aziende italiane.',
    areaServed: {
      '@type': 'Country',
      name: 'Italia',
    },
    serviceType: [
      'Consulenza AI',
      'Sviluppo AI',
      'Automazione Processi',
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
