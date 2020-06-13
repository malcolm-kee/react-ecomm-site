const base = require('./tailwind.config');

module.exports = {
  ...base,
  purge: {
    enabled: true,
    content: [
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js',
      './public/**/*.html',
    ],
  },
};
