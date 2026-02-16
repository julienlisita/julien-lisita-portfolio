/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',

        /* Expose minimal neutrals if tu veux les appeler directement */
        neutral: {
          100: 'var(--neutral-100)',
          300: 'var(--neutral-300)',
          600: 'var(--neutral-600)',
          900: 'var(--neutral-900)',
        },
      },
    },
  },
  plugins: [],
};
