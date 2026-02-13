import { Header, Footer, MobileContactButton } from '@/components/layout';
import { HomeContent } from '@/components/sections';
// TEMPORARILY DISABLED - AICore chatbot
// import { AICore } from '@/components/effects';

export default async function Home() {
  return (
    <>
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
