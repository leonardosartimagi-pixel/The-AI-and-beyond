'use client';

import dynamic from 'next/dynamic';
import { Hero } from './Hero';
import { BrandShowcase } from './BrandShowcase';

// Dynamically import below-fold sections for better initial page load
const About = dynamic(() => import('./About').then((mod) => mod.About), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Services = dynamic(() => import('./Services').then((mod) => mod.Services), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Portfolio = dynamic(() => import('./Portfolio').then((mod) => mod.Portfolio), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const BeforeAfter = dynamic(() => import('./BeforeAfter').then((mod) => mod.BeforeAfter), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const ROICalculator = dynamic(() => import('./ROICalculator').then((mod) => mod.ROICalculator), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Process = dynamic(() => import('./Process').then((mod) => mod.Process), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const FAQ = dynamic(() => import('./FAQ').then((mod) => mod.FAQ), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

const Contact = dynamic(() => import('./Contact').then((mod) => mod.Contact), {
  loading: () => <section className="py-24 lg:py-32" aria-hidden="true" />,
});

export function HomeContent() {
  return (
    <>
      <Hero />
      <BrandShowcase />
      <About />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <ROICalculator />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
}
