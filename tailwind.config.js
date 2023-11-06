/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,tsx}',
    './public/tw-classes.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter'],
      },
      screens: {
        'xs': '480px'
      },
      maxWidth: {
        'screen-3xl': '1920px'
      },
      colors: {},
      spacing: {
        '4.5': '1.125rem',
        '7.5': '1.875rem'
      },
      fontSize: {
        'default': '0.9375em',
        '6.5xl': '4rem'
      },
      borderRadius: {
        'default': '0.625rem'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
