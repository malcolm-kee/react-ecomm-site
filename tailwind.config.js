const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      xs: '550px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        teal: colors.teal,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};

module.exports = tailwindConfig;
