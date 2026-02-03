import { Header, Footer } from '@/components/layout';
import { Hero, About, Services, Portfolio } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        {/* Placeholder sections for navigation - to be implemented */}
        <section id="come-lavoro" className="min-h-screen bg-gray-50" />
        <section id="contatti" className="min-h-screen bg-white" />
      </main>
      <Footer />
    </>
  );
}
