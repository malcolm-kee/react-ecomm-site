const PRODUCT_DB = [
  {
    id: 1,
    name: 'iPhone X',
    descriptions: ['user-friendly', 'change the world', 'cool', 'expensive'],
    image: 'iphone-x.jpg',
    department: 'Electronics',
    price: '3499.00',
    related: [1552750775152, 1552750775200, 1552750775171],
    images: {
      standard: 'i-phone-x.standard.600x600.jpeg',
      webp: 'i-phone-x.webp.600x600.webp',
      thumbStandard: 'i-phone-x.thumbStandard.188x188.jpeg',
      thumbWebp: 'i-phone-x.thumbWebp.188x188.webp',
      blur: 'i-phone-x.blur.600x600.jpeg',
      thumbBlur: 'i-phone-x.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 2,
    name: 'Samsung Galaxy S10',
    descriptions: ['big', 'heavy', 'expensive'],
    image: 'samsung-galaxy-s10.jpg',
    department: 'Electronics',
    price: '3299.00',
    related: [1552750775133, 1],
    images: {
      standard: 'samsung-galaxy-s10.standard.600x600.jpeg',
      webp: 'samsung-galaxy-s10.webp.600x600.webp',
      thumbStandard: 'samsung-galaxy-s10.thumbStandard.188x188.jpeg',
      thumbWebp: 'samsung-galaxy-s10.thumbWebp.188x188.webp',
      blur: 'samsung-galaxy-s10.blur.600x600.jpeg',
      thumbBlur: 'samsung-galaxy-s10.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 3,
    name: 'Daniel Wellington Classic Cambridge',
    descriptions: ['pretty', 'elegent', 'expensive'],
    image: 'dw-watch.png',
    department: 'Clothing',
    price: '1999.00',
    related: [1552750775194, 1552750775147],
    images: {
      standard: 'daniel-wellington-classic-cambridge.standard.600x600.jpeg',
      webp: 'daniel-wellington-classic-cambridge.webp.600x600.webp',
      thumbStandard:
        'daniel-wellington-classic-cambridge.thumbStandard.188x188.jpeg',
      thumbWebp: 'daniel-wellington-classic-cambridge.thumbWebp.188x188.webp',
      blur: 'daniel-wellington-classic-cambridge.blur.600x600.jpeg',
      thumbBlur: 'daniel-wellington-classic-cambridge.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 4,
    name: 'dodo',
    descriptions: [],
    image: 'dono.png',
    department: 'Food',
    price: '2.50',
    related: [],
    images: null
  },
  {
    id: 1552750775126,
    name: 'Generic Concrete Car',
    descriptions: ['Refined', 'Handmade'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Sports',
    price: '365.00',
    related: [1552750775192, 1552750775163],
    images: {
      standard: 'generic-concrete-car.standard.600x600.jpeg',
      webp: 'generic-concrete-car.webp.600x600.webp',
      thumbStandard: 'generic-concrete-car.thumbStandard.188x188.jpeg',
      thumbWebp: 'generic-concrete-car.thumbWebp.188x188.webp',
      blur: 'generic-concrete-car.blur.600x600.jpeg',
      thumbBlur: 'generic-concrete-car.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775127,
    name: 'Incredible Granite Sausages',
    descriptions: ['Unbranded', 'Small'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Kids',
    price: '670.00',
    related: [1552750775148, 1552750775188],
    images: {
      standard: 'incredible-granite-sausages.standard.600x600.jpeg',
      webp: 'incredible-granite-sausages.webp.600x600.webp',
      thumbStandard: 'incredible-granite-sausages.thumbStandard.188x188.jpeg',
      thumbWebp: 'incredible-granite-sausages.thumbWebp.188x188.webp',
      blur: 'incredible-granite-sausages.blur.600x600.jpeg',
      thumbBlur: 'incredible-granite-sausages.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775128,
    name: 'Fantastic Plastic Mouse',
    descriptions: ['Rustic', 'Gorgeous'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Music',
    price: '265.00',
    related: [],
    images: {
      standard: 'fantastic-plastic-mouse.standard.600x600.jpeg',
      webp: 'fantastic-plastic-mouse.webp.600x600.webp',
      thumbStandard: 'fantastic-plastic-mouse.thumbStandard.188x188.jpeg',
      thumbWebp: 'fantastic-plastic-mouse.thumbWebp.188x188.webp',
      blur: 'fantastic-plastic-mouse.blur.600x600.jpeg',
      thumbBlur: 'fantastic-plastic-mouse.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775129,
    name: 'Small Cotton Mouse',
    descriptions: ['Unbranded', 'Sleek'],
    image: 'http://lorempixel.com/700/700/fashion',
    department: 'Movies',
    price: '834.00',
    related: [],
    images: {
      standard: 'small-cotton-mouse.standard.600x600.jpeg',
      webp: 'small-cotton-mouse.webp.600x600.webp',
      thumbStandard: 'small-cotton-mouse.thumbStandard.188x188.jpeg',
      thumbWebp: 'small-cotton-mouse.thumbWebp.188x188.webp',
      blur: 'small-cotton-mouse.blur.600x600.jpeg',
      thumbBlur: 'small-cotton-mouse.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775130,
    name: 'Tasty Concrete Hat',
    descriptions: ['Ergonomic', 'Handmade'],
    image: 'http://lorempixel.com/700/700/fashion',
    department: 'Movies',
    price: '301.00',
    related: [1552750775220, 1552750775142],
    images: {
      standard: 'tasty-concrete-hat.standard.600x600.jpeg',
      webp: 'tasty-concrete-hat.webp.600x600.webp',
      thumbStandard: 'tasty-concrete-hat.thumbStandard.188x188.jpeg',
      thumbWebp: 'tasty-concrete-hat.thumbWebp.188x188.webp',
      blur: 'tasty-concrete-hat.blur.600x600.jpeg',
      thumbBlur: 'tasty-concrete-hat.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775131,
    name: 'Awesome Plastic Keyboard',
    descriptions: ['Generic', 'Generic'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Beauty',
    price: '79.00',
    related: [1552750775179],
    images: {
      standard: 'awesome-plastic-keyboard.standard.600x600.jpeg',
      webp: 'awesome-plastic-keyboard.webp.600x600.webp',
      thumbStandard: 'awesome-plastic-keyboard.thumbStandard.188x188.jpeg',
      thumbWebp: 'awesome-plastic-keyboard.thumbWebp.188x188.webp',
      blur: 'awesome-plastic-keyboard.blur.600x600.jpeg',
      thumbBlur: 'awesome-plastic-keyboard.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775132,
    name: 'Rustic Concrete Bacon',
    descriptions: ['Gorgeous', 'Generic'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Toys',
    price: '160.00',
    related: [1552750775202],
    images: {
      standard: 'rustic-concrete-bacon.standard.600x600.jpeg',
      webp: 'rustic-concrete-bacon.webp.600x600.webp',
      thumbStandard: 'rustic-concrete-bacon.thumbStandard.188x188.jpeg',
      thumbWebp: 'rustic-concrete-bacon.thumbWebp.188x188.webp',
      blur: 'rustic-concrete-bacon.blur.600x600.jpeg',
      thumbBlur: 'rustic-concrete-bacon.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775133,
    name: 'Refined Fresh Chips',
    descriptions: ['Awesome', 'Tasty'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Electronics',
    price: '699.00',
    related: [1552750775181, 1552750775189],
    images: {
      standard: 'refined-fresh-chips.standard.600x600.jpeg',
      webp: 'refined-fresh-chips.webp.600x600.webp',
      thumbStandard: 'refined-fresh-chips.thumbStandard.188x188.jpeg',
      thumbWebp: 'refined-fresh-chips.thumbWebp.188x188.webp',
      blur: 'refined-fresh-chips.blur.600x600.jpeg',
      thumbBlur: 'refined-fresh-chips.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775152,
    name: 'Sleek Metal Car',
    descriptions: ['Tasty', 'Awesome'],
    image: 'http://lorempixel.com/700/700/fashion',
    department: 'Electronics',
    price: '735.00',
    related: [1552750775189, 1552750775212, 1552750775171],
    images: {
      standard: 'sleek-metal-car.standard.600x600.jpeg',
      webp: 'sleek-metal-car.webp.600x600.webp',
      thumbStandard: 'sleek-metal-car.thumbStandard.188x188.jpeg',
      thumbWebp: 'sleek-metal-car.thumbWebp.188x188.webp',
      blur: 'sleek-metal-car.blur.600x600.jpeg',
      thumbBlur: 'sleek-metal-car.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775200,
    name: 'Fantastic Plastic Hat',
    descriptions: ['Intelligent', 'Intelligent'],
    image: 'http://lorempixel.com/700/700/technics',
    department: 'Electronics',
    price: '485.00',
    related: [1552750775181, 1552750775212],
    images: {
      standard: 'fantastic-plastic-hat.standard.600x600.jpeg',
      webp: 'fantastic-plastic-hat.webp.600x600.webp',
      thumbStandard: 'fantastic-plastic-hat.thumbStandard.188x188.jpeg',
      thumbWebp: 'fantastic-plastic-hat.thumbWebp.188x188.webp',
      blur: 'fantastic-plastic-hat.blur.600x600.jpeg',
      thumbBlur: 'fantastic-plastic-hat.thumbBlur.188x188.jpeg'
    }
  },
  {
    id: 1552750775171,
    name: 'Practical Frozen Gloves',
    descriptions: ['Practical', 'Sleek'],
    image: 'http://lorempixel.com/700/700/fashion',
    department: 'Electronics',
    price: '452.00',
    related: [1, 1552750775200, 1552750775152],
    images: {
      standard: 'practical-frozen-gloves.standard.600x600.jpeg',
      webp: 'practical-frozen-gloves.webp.600x600.webp',
      thumbStandard: 'practical-frozen-gloves.thumbStandard.188x188.jpeg',
      thumbWebp: 'practical-frozen-gloves.thumbWebp.188x188.webp',
      blur: 'practical-frozen-gloves.blur.600x600.jpeg',
      thumbBlur: 'practical-frozen-gloves.thumbBlur.188x188.jpeg'
    }
  }
];

const COMMENT_DB = [
  {
    id: 1552750775328,
    productId: 2,
    userId: 1552750775317,
    userName: 'Skye Watsica',
    content: 'Repudiandae quos occaecati dignissimos.',
    createdOn: 1549749247748
  },
  {
    id: 1552750775329,
    productId: 2,
    userId: 1552750775232,
    userName: "Shaina O'Kon",
    content: 'Soluta ipsam vel.',
    createdOn: 1551735807637
  },
  {
    id: 1552750775330,
    productId: 2,
    userId: 1552750775317,
    userName: 'Skye Watsica',
    content: 'Hic alias quam corrupti velit.',
    createdOn: 1530457269057
  }
];

export function getProducts(page, limit = 12) {
  return Promise.resolve(PRODUCT_DB.slice((page - 1) * 2, page * 2));
}

export function getProduct(productId) {
  const foundProduct = PRODUCT_DB.find(product => product.id === productId);
  return Promise.resolve(foundProduct);
}

export function getProductComments(productId) {
  return Promise.resolve(COMMENT_DB);
}

export function createProductComment(comment) {
  return Promise.resolve(COMMENT_DB[0]);
}
