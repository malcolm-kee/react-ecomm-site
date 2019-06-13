const fetch = require('node-fetch');

const PRODUCT_BASE_URL = 'https://ecomm-db.herokuapp.com/products';

const { createProductNodeId } = require('./create-id');

module.exports = async function createProductNodes(
  { comments },
  { createNode, createNodeId, createContentDigest }
) {
  const data = await fetch(PRODUCT_BASE_URL).then(res => res.json());

  await Promise.all(
    data.map(product => {
      const node = processProduct(product, comments, {
        createNodeId,
        createContentDigest,
      });
      return createNode(node);
    })
  );
};

function processProduct(
  product,
  comments,
  { createNodeId, createContentDigest }
) {
  const nodeId = createProductNodeId(product.id, createNodeId);
  const content = JSON.stringify(product);
  const nodeData = Object.assign({}, product, {
    id: nodeId,
    parent: null,
    children: [],
    related___NODE: product.related.map(id =>
      createProductNodeId(id, createNodeId)
    ),
    comments___NODE: comments
      .filter(comment => comment.productId === product.id)
      .map(comment => comment.id),
    internal: {
      content,
      type: `EcommProduct`,
      contentDigest: createContentDigest(product),
    },
  });

  delete nodeData.related;

  return nodeData;
}
