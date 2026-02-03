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
          color: '#137dc5',
        },
      },
      push: {
        quantity: 3,
      },
    },
  },
  particles: {
    color: {
      value: ['#137dc5', '#00aeef', '#1b2f75'],
    },
    links: {
      enable: true,
      color: '#137dc5',
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
