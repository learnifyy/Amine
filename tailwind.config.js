/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#FFF37A',
          DEFAULT: '#FFDF00',
        },
        orange: {
          primary: '#FF9F1C',
        },
        amber: {
          warm: '#A04A0A',
        },
        chocolate: {
          deep: '#4A1E05',
        },
        bg: {
          dark: '#120A05',
          darker: '#000000',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
