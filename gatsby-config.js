module.exports = {
  siteMetadata: {
    title: 'Shopit',
    description:
      'The best shopping site in the web that would saves you most money.',
    siteUrl: 'https://gatsby.shopit.space/',
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-source-react-ecomm`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Shopit',
        short_name: 'Shopit',
        start_url: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: '#178acc',
        icon: 'src/images/shopping-bag.png',
        include_favicon: false,
      },
    },
  ],
};
