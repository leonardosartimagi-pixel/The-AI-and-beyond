import { Header, Footer } from '@/components/layout';
import { Hero, About, Services, Portfolio, BeforeAfter, ROICalculator, Process } from '@/components/sections';

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
        <Process />
        {/* Placeholder section for navigation - to be implemented */}
        <section id="contatti" className="min-h-screen bg-white" />
      </main>
      <Footer />
    </>
  );
}
