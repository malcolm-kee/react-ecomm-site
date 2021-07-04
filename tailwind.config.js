const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './public/index.html',
  ],
  theme: {
    screens: {
      xs: '550px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        teal: colors.teal
      }
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
