/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef0ff',
          100: '#e0e3ff',
          200: '#c7ccff',
          300: '#a3a8ff',
          400: '#817cfb',
          500: '#6d5bf3',
          600: '#5b3fe6',
          700: '#4d31cb',
          800: '#402ba4',
          900: '#372a82',
        },
        coral: {
          400: '#ff8a5c',
          500: '#ff6b3d',
          600: '#f0531f',
        },
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(45, 38, 90, 0.08), 0 4px 24px -8px rgba(45, 38, 90, 0.06)',
        card: '0 1px 3px rgba(45, 38, 90, 0.06), 0 8px 24px -12px rgba(45, 38, 90, 0.10)',
        lift: '0 8px 32px -8px rgba(91, 63, 230, 0.25)',
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
