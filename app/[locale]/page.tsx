import { headers } from 'next/headers';
import { Header, Footer, MobileContactButton } from '@/components/layout';
import { HomeContent } from '@/components/sections';
// TEMPORARILY DISABLED - AICore chatbot
// import { AICore } from '@/components/effects';

export default async function Home() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Header />
      <main id="main-content">
        <HomeContent nonce={nonce} />
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
