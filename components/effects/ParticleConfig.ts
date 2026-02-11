import type { ISourceOptions } from '@tsparticles/engine';

// Neural network style particle configuration
// Mix between "tech moderato" and "immersivo denso"
export const particleConfig: ISourceOptions = {
  fullScreen: false,
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.8,
          color: '#1177bd',
        },
      },
      push: {
        quantity: 3,
      },
    },
  },
  particles: {
    color: {
      value: ['#1177bd', '#00aeef', '#1b2f75'],
    },
    links: {
      enable: true,
      color: '#1177bd',
      distance: 150,
      opacity: 0.3,
      width: 1,
      triangles: {
        enable: false,
      },
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce',
      },
      attract: {
        enable: false,
      },
    },
    number: {
      value: 80,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    opacity: {
      value: {
        min: 0.3,
        max: 0.7,
      },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: {
        min: 1,
        max: 4,
      },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
  },
  detectRetina: true,
};

// Lighter configuration for mobile devices
export const particleConfigMobile: ISourceOptions = {
  ...particleConfig,
  particles: {
    ...particleConfig.particles,
    number: {
      value: 40,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
  },
};

// Configuration for light background sections (interactive blue particles)
export const particleConfigLight: ISourceOptions = {
  fullScreen: false,
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: false, // Disabled since particles are pointer-events: none
        mode: 'grab',
      },
      onClick: {
        enable: false,
        mode: 'push',
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.5,
          color: '#1177bd',
        },
      },
      push: {
        quantity: 2,
      },
    },
  },
  particles: {
    color: {
      value: ['#1177bd', '#1b2f75'], // Blue tones for contrast on white
    },
    links: {
      enable: true,
      color: '#1177bd',
      distance: 200,
      opacity: 0.25, // More visible on light background
      width: 1,
      triangles: {
        enable: false,
      },
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce',
      },
      attract: {
        enable: false,
      },
    },
    number: {
      value: 50, // Slightly more particles
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    opacity: {
      value: {
        min: 0.4,
        max: 0.7,
      },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
      },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: {
        min: 2,
        max: 4,
      },
      animation: {
        enable: false,
      },
    },
  },
  detectRetina: true,
};

// Mobile version of light background particles
export const particleConfigLightMobile: ISourceOptions = {
  ...particleConfigLight,
  particles: {
    ...particleConfigLight.particles,
    number: {
      value: 25, // Fewer on mobile but still visible
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
  },
};
