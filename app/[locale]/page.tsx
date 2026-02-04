import { getTranslations } from 'next-intl/server';
import { Header, Footer, MobileContactButton } from '@/components/layout';
import { HomeContent } from '@/components/sections';
import { AICore } from '@/components/effects';

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
      <AICore />
    </>
  );
}
