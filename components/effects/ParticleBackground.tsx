'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';
import { useReducedMotion } from '@/hooks';
import { particleConfig, particleConfigMobile } from './ParticleConfig';

export function ParticleBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isEngineReady, setIsEngineReady] = useState(false);

  // Initialize tsparticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsEngineReady(true);
    });
  }, []);

  useEffect(() => {
    // Check if mobile on client side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded - can add analytics or logging here if needed
  }, []);

  // Don't render particles if user prefers reduced motion or engine not ready
  if (prefersReducedMotion || !isEngineReady) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-[1]"
      particlesLoaded={particlesLoaded}
      options={isMobile ? particleConfigMobile : particleConfig}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
