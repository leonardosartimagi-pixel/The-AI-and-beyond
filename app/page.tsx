import { Header, Footer } from '@/components/layout';
import { Hero, About } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {/* Placeholder sections for navigation - to be implemented */}
        <section id="servizi" className="min-h-screen bg-gray-50" />
        <section id="portfolio" className="min-h-screen bg-white" />
        <section id="come-lavoro" className="min-h-screen bg-gray-50" />
        <section id="contatti" className="min-h-screen bg-white" />
      </main>
      <Footer />
    </>
  );
}
