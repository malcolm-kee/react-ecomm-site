const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
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
