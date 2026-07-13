/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f5f2',
          100: '#ece7df',
          200: '#ddd4c7',
          300: '#c7baa7',
          400: '#a6937c',
          500: '#85725d',
          600: '#665646',
          700: '#4f4338',
          800: '#352d25',
          900: '#1f1915',
          950: '#120f0c',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17, 24, 39, 0.05), 0 12px 24px rgba(17, 24, 39, 0.04)',
      },
    },
  },
  plugins: [],
};
