const createProductNodes = require('./src/create-product-nodes');
const createCommentNodes = require('./src/create-comment-nodes');

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const comments = await createCommentNodes({
    createNode,
    createNodeId,
    createContentDigest,
  });
  await createProductNodes(
    { comments },
    { createNode, createNodeId, createContentDigest }
  );
};
