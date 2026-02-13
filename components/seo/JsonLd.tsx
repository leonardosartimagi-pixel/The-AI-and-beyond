import { headers } from 'next/headers';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

interface JsonLdProps {
  locale: string;
}

const FAQ_ITEMS = {
  it: [
    {
      question: "L'AI è adatta alla mia azienda?",
      answer:
        "Dipende. Non da quanto è grande la tua azienda, ma da dove perde tempo o soldi. Se hai processi ripetitivi che occupano persone qualificate, dati che nessuno analizza, o un team che fa lavoro manuale evitabile — probabilmente sì. Il primo passo è sempre una diagnosi: capiamo il tuo contesto, mappiamo le inefficienze, e ti diciamo con onestà dove l'AI ha senso e dove no.",
    },
    {
      question: 'Quanto tempo richiede un progetto AI?',
      answer:
        'Un MVP o proof-of-concept: 2-4 settimane. Progetti più strutturati: 2-3 mesi. Lavoriamo in agile — sprint settimanali, demo regolari, nessun effetto black-box. Vedi il progresso dal giorno uno, non dopo mesi di silenzio.',
    },
    {
      question: 'Quanto costa un progetto di consulenza AI?',
      answer:
        'Non abbiamo un listino prezzi — automatizzare lo smistamento email di un team di 5 persone è diverso da costruire un gestionale AI-powered. Il costo dipende da cosa va costruito e da quanto è complesso. Quello che facciamo sempre: prima call gratuita per capire il problema, poi un preventivo chiaro con scope, tempi e costi — prima che venga scritto codice.',
    },
    {
      question: 'Come funziona il processo di lavoro?',
      answer:
        'Call conoscitiva gratuita — capiamo il problema e il contesto. Analisi e proposta concreta con scope, tempi e costi. Se si parte, lavoriamo in agile: sprint settimanali, demo di quello che funziona, feedback continuo. Non ricevi un deliverable finale dopo mesi di silenzio — vedi il progresso settimana per settimana.',
    },
  ],
  en: [
    {
      question: 'Is AI right for my business?',
      answer:
        "It depends. Not on how big your company is, but on where it's losing time or money. If you have repetitive processes tying up skilled people, data no one analyzes, or a team doing avoidable manual work — probably yes. The first step is always a diagnosis: we understand your context, map the inefficiencies, and honestly tell you where AI makes sense and where it doesn't.",
    },
    {
      question: 'How long does an AI project take?',
      answer:
        'An MVP or proof-of-concept: 2-4 weeks. More structured projects: 2-3 months. We work in agile — weekly sprints, regular demos, zero black-box effect. You see progress from day one, not after months of silence.',
    },
    {
      question: 'How much does an AI consulting project cost?',
      answer:
        "We don't have a price list — automating email sorting for a 5-person team is different from building an AI-powered management system. Cost depends on what needs to be built and how complex it is. What we always do: free first call to understand the problem, then a clear quote with scope, timeline, and costs — before any code is written.",
    },
    {
      question: 'How does the work process work?',
      answer:
        "Free introductory call — we understand the problem and context. Analysis and concrete proposal with scope, timeline, and costs. If we go ahead, we work in agile: weekly sprints, demos of what works, continuous feedback. You don't receive a final deliverable after months of silence — you see progress week by week.",
    },
  ],
};

export async function JsonLd({ locale }: JsonLdProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const isItalian = locale === 'it';
  const faqItems = isItalian ? FAQ_ITEMS.it : FAQ_ITEMS.en;

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
          url: `${SITE_URL}/logos/logo-color.png`,
          contentUrl: `${SITE_URL}/logos/logo-color.png`,
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
        sameAs: [
          'https://linkedin.com/in/leonardosartimagi',
          'https://roboticafestival.it/partecipanti/sarti-magi-leonardo/',
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: isItalian ? 'Università di Pisa' : 'University of Pisa',
        },
      },

      // Event - Festival della Robotica di Viareggio
      {
        '@type': 'Event',
        '@id': `${SITE_URL}/#vmove-robotics-festival`,
        name: isItalian
          ? 'Festival della Robotica di Viareggio 2025'
          : 'Viareggio Robotics Festival 2025',
        url: 'https://roboticafestival.it/viareggio-2025/',
        location: {
          '@type': 'Place',
          name: 'Viareggio',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Viareggio',
            addressRegion: 'Toscana',
            addressCountry: 'IT',
          },
        },
        startDate: '2025-01-11',
        performer: {
          '@type': 'Person',
          name: 'Leonardo Sarti Magi',
          sameAs: `${SITE_URL}/#person`,
        },
        about: {
          '@type': 'CreativeWork',
          name: 'V-Move CareBot',
          description: isItalian
            ? 'Robot guida autonomo per persone con disabilità nei porti turistici, basato su intelligenza artificiale e navigazione autonoma'
            : 'Autonomous guide robot for people with disabilities in marinas, based on artificial intelligence and autonomous navigation',
          creator: { '@id': `${SITE_URL}/#person` },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Festival della Robotica',
          url: 'https://roboticafestival.it/',
        },
      },

      // NewsArticle - La Nazione article
      {
        '@type': 'NewsArticle',
        '@id': `${SITE_URL}/#vmove-lanazione-article`,
        headline: isItalian
          ? "Il futuro bussa a Yachting Events - Al «Festival della Robotica» il mondo Darsena incontra l'IA"
          : 'The future knocks at Yachting Events - At the «Robotics Festival» the Marina world meets AI',
        url: 'https://www.lanazione.it/viareggio/cronaca/il-futuro-bussa-a-yachting-7a25f42c',
        datePublished: '2025-01-11',
        publisher: {
          '@type': 'Organization',
          name: 'La Nazione',
          url: 'https://www.lanazione.it/',
        },
        mentions: [
          { '@id': `${SITE_URL}/#person` },
          { '@id': `${SITE_URL}/#vmove-robotics-festival` },
        ],
        about: isItalian
          ? 'Presentazione di V-Move CareBot, robot AI per accessibilità nei porti turistici'
          : 'Presentation of V-Move CareBot, AI robot for accessibility in tourist ports',
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

      // FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${locale}/#faq`,
        name: isItalian ? 'Domande frequenti' : 'Frequently Asked Questions',
        isPartOf: { '@id': `${SITE_URL}/${locale}/#webpage` },
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
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
