import { Header, Footer, MobileContactButton } from '@/components/layout';
import { Hero, About, Services, Portfolio, BeforeAfter, ROICalculator, Process, Contact } from '@/components/sections';

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
        <Contact />
      </main>
      <Footer />
      <MobileContactButton />
    </>
  );
}
