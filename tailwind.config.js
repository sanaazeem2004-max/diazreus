/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Button variants are composed dynamically (btn-${variant}), so list them explicitly.
  safelist: ['btn-dark', 'btn-light', 'btn-outline', 'btn-outline-light'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0F0F10', 800: '#18181A', 700: '#232326', 600: '#3A3A3E', 500: '#5C5C62', 400: '#8A8A90' },
        paper: '#FFFFFF',
        mist: { DEFAULT: '#F4F3F0', 200: '#ECEBE7' },
        line: { DEFAULT: '#E3E2DD', dark: '#2C2C30' },
        brand: { DEFAULT: '#00548B', light: '#8DBBDD', dark: '#073F66', tint: '#E8F0F7' },
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em' }],
        display: ['clamp(2.75rem, 6.4vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        h1: ['clamp(2.25rem, 4.6vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.875rem, 3.4vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: { card: '1.25rem', xl2: '1.5rem' },
      spacing: { section: 'clamp(5rem, 9vw, 8.5rem)' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
