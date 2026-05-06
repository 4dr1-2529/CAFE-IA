/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: '#fdf8f3',
          100: '#f7ede0',
          200: '#edd9c4',
          300: '#dfc09e',
          400: '#cfa278',
          500: '#b8895a',
          600: '#9a6f46',
          700: '#7c5739',
          800: '#63472f',
          900: '#513b27',
        },
        cafeVerde: {
          50: '#f0f7f0',
          100: '#dceadf',
          200: '#bad3bf',
          300: '#8eb89a',
          400: '#629878',
          500: '#3d7d5c',
          600: '#316349',
          700: '#28503b',
          800: '#214131',
          900: '#1d352b',
        }
      }
    },
  },
  plugins: [],
}