'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';
import { useReducedMotion } from '@/hooks';
import { particleConfigLight, particleConfigLightMobile } from './ParticleConfig';

export function GlobalParticles() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsEngineReady(true);
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide particles when in hero section (hero has its own particles)
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show global particles only when scrolled past hero
        setIsInHero(heroBottom > 100);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    // Particles loaded callback - can be used for logging if needed
  }, []);

  // Don't render if reduced motion, engine not ready, or still in hero
  if (prefersReducedMotion || !isEngineReady || isInHero) {
    return null;
  }

  return (
    <Particles
      id="global-particles"
      className="pointer-events-none fixed inset-0"
      particlesLoaded={particlesLoaded}
      options={isMobile ? particleConfigLightMobile : particleConfigLight}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none', // Allow clicks through particles
      }}
    />
  );
}
