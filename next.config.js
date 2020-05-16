const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps({
  pageExtensions: ['tsx', 'js'],
});
