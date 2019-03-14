module.exports = {
  components: 'src/components/**/*.{jsx,tsx}',
  webpackConfig: require('react-scripts/config/webpack.config.js'),
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.output = {
      ...webpackConfig.output,
      publicPath: process.env.PUBLIC_URL || ''
    };
    return webpackConfig;
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://bootswatch.com/3/cerulean/bootstrap.min.css'
        }
      ]
    }
  }
};
