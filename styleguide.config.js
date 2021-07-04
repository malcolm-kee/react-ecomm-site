const path = require('path');

const tsParser = require('react-docgen-typescript').withCustomConfig(
  './tsconfig.json',
  {
    savePropValueAsString: true,
    propFilter: (prop) => {
      if (prop.parent) {
        return !prop.parent.fileName.includes('@types/react/');
      }

      return true;
    },
  }
);

/**
 * @type {import('react-styleguidist').StyleguidistConfig}
 */
module.exports = {
  sections: [
    {
      name: 'Components',
      components: 'src/components/**/*.{jsx,tsx}',
    },
    {
      name: 'Icons',
      content: path.resolve(__dirname, 'src', 'icon/icon.md'),
    },
  ],
  require: [path.join(__dirname, 'src', 'tailwind.css')],
  propsParser: (filePath, source, resolver, handlers) => {
    const { ext } = path.parse(filePath);
    return ext === '.tsx'
      ? tsParser.parse(filePath, source, resolver, handlers)
      : require('react-docgen').parse(source, resolver, handlers);
  },
};
