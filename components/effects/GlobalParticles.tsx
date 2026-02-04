'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';
import { useReducedMotion } from '@/hooks';
import { particleConfigLight, particleConfigLightMobile } from './ParticleConfig';

// Sections where particles should be visible
const PARTICLE_SECTIONS = ['servizi', 'portfolio', 'contatti'];

export function GlobalParticles() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [shouldShowParticles, setShouldShowParticles] = useState(false);

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

  // Show particles when specific sections are visible
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      // Check if any of the target sections are visible
      const isAnyTargetSectionVisible = PARTICLE_SECTIONS.some((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return false;

        const rect = section.getBoundingClientRect();
        // Section is visible if it's at least 20% in viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = visibleBottom - visibleTop;

        return visibleHeight > viewportHeight * 0.2;
      });

      setShouldShowParticles(isAnyTargetSectionVisible);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    // Particles loaded
  }, []);

  // Don't render if reduced motion, engine not ready, or not in target sections
  if (prefersReducedMotion || !isEngineReady || !shouldShowParticles) {
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
        zIndex: 20,
      }}
    />
  );
}
