/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        },
        page: 'var(--bg-page)',
        card: 'var(--bg-card)',
        'card-border': 'var(--border-card)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent-orange)',
      },
      boxShadow: {
        panel: '0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)',
        'panel-hover': '0 4px 16px rgba(15, 23, 42, 0.1), 0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
        spinSlow: 'spinSlow 0.9s linear infinite',
      },
      transitionDuration: {
        theme: '300ms',
      },
    },
  },
  plugins: [],
}
