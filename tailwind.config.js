const defaultTheme = require('tailwindcss/defaultTheme');

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
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
};
