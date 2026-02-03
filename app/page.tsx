import { Header, Footer } from '@/components/layout';
import { Hero, About, Services, Portfolio, BeforeAfter, ROICalculator } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <BeforeAfter />
        <ROICalculator />
        {/* Placeholder sections for navigation - to be implemented */}
        <section id="come-lavoro" className="min-h-screen bg-gray-50" />
        <section id="contatti" className="min-h-screen bg-white" />
      </main>
      <Footer />
    </>
  );
}
