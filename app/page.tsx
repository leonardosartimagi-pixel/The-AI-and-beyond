import dynamic from 'next/dynamic';
import { Header, Footer, MobileContactButton } from '@/components/layout';
import { Hero } from '@/components/sections';

// Dynamically import below-fold sections for better initial page load
// These components will be loaded as users scroll down
const About = dynamic(() => import('@/components/sections/About').then((mod) => mod.About), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Services = dynamic(() => import('@/components/sections/Services').then((mod) => mod.Services), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Portfolio = dynamic(() => import('@/components/sections/Portfolio').then((mod) => mod.Portfolio), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const BeforeAfter = dynamic(
  () => import('@/components/sections/BeforeAfter').then((mod) => mod.BeforeAfter),
  {
    loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
  }
);

const ROICalculator = dynamic(
  () => import('@/components/sections/ROICalculator').then((mod) => mod.ROICalculator),
  {
    loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
  }
);

const Process = dynamic(() => import('@/components/sections/Process').then((mod) => mod.Process), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact').then((mod) => mod.Contact), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Vai al contenuto principale
      </a>
      <Header />
      <main id="main-content">
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
