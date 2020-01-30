module.exports = {
  components: 'src/components/**/*.{jsx,tsx}',
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
        },
      ],
    },
  },
};
