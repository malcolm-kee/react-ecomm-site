const path = require('path');

const tsParser = require('react-docgen-typescript').withDefaultConfig({
  savePropValueAsString: true,
  propFilter: prop => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('@types/react');
    }

    return true;
  }
});

module.exports = {
  components: 'src/components/**/*.{jsx,tsx}',
  propsParser: (filePath, source, resolver, handlers) => {
    const { ext } = path.parse(filePath);
    return ext === '.tsx'
      ? tsParser.parse(filePath, source, resolver, handlers)
      : require('react-docgen').parse(source, resolver, handlers);
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
