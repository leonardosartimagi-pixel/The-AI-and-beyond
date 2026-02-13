import { Header, Footer, MobileContactButton } from '@/components/layout';
import { HomeContent } from '@/components/sections';
import { FloatingAICTA } from '@/components/ui';
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
      <FloatingAICTA />
      {/* TEMPORARILY DISABLED - AICore chatbot
          To re-enable: uncomment the import above and the component below
      <AICore />
      */}
    </>
  );
}
