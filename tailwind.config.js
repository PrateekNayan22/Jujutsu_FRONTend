/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cursed: {
          blue: '#4361ee',
          red: '#ef233c',
          purple: '#7209b7',
          dark: '#0a0a0f',
          charcoal: '#141420',
          grey: '#2a2a3a',
          muted: '#6c6c8a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};