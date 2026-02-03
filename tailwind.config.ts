import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1b2f75', // Blu scuro del logo ufficiale
          dark: '#151f4f',
          light: '#2d388a',
        },
        accent: {
          DEFAULT: '#137dc5', // Blu primario del logo ufficiale
          dark: '#0f6ba8',
          light: '#00aeef', // Cyan dal gradiente logo
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
