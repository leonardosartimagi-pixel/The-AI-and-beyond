import { getTranslations } from 'next-intl/server';
import { Header, Footer, MobileContactButton } from '@/components/layout';
import { HomeContent } from '@/components/sections';
// TEMPORARILY DISABLED - AICore chatbot
// import { AICore } from '@/components/effects';

export default async function Home() {
  const t = await getTranslations();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {t('skipToContent')}
      </a>
      <Header />
      <main id="main-content">
        <HomeContent />
      </main>
      <Footer />
      <MobileContactButton />
      {/* TEMPORARILY DISABLED - AICore chatbot
          To re-enable: uncomment the import above and the component below
      <AICore />
      */}
    </>
  );
}
