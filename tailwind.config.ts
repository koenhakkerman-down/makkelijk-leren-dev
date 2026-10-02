import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf7ff',
          100: '#d7ebff',
          200: '#b6dcff',
          300: '#7dbdff',
          400: '#4f9cff',
          500: '#257cf4',
          600: '#1c63d3',
          700: '#174ead',
          800: '#173f8c',
          900: '#16356d',
        },
        accent: {
          50: '#eefdf8',
          500: '#1ecf9d',
          600: '#13b087',
        },
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top, rgba(59,130,246,0.2), transparent 45%)'
      }
    }
  },
  plugins: []
};

export default config;
