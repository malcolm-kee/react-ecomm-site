const format = require('date-fns/format');
const fetch = require('node-fetch');
const { createProductNodeId, createCommentNodeId } = require('./create-id');

const PRODUCT_COMMENT_BASE_URL = 'https://ecomm-db.herokuapp.com/comments';

module.exports = async function createCommentNodes({
  createNode,
  createNodeId,
  createContentDigest,
}) {
  const data = await fetch(PRODUCT_COMMENT_BASE_URL).then(res => res.json());

  const comments = await Promise.all(
    data.map(comment => {
      const node = processComment(comment, {
        createNodeId,
        createContentDigest,
      });
      return createNode(node).then(() => node);
    })
  );

  return comments;
};

function processComment(comment, { createNodeId, createContentDigest }) {
  const nodeId = createCommentNodeId(comment.id, createNodeId);
  const content = JSON.stringify(comment);
  const nodeData = Object.assign({}, comment, {
    id: nodeId,
    parent: null,
    children: [],
    createdOn: format(new Date(comment.createdOn), 'YYYY-MM-DDTHHZ'),
    product___NODE: createProductNodeId(comment.productId, createNodeId),
    internal: {
      content,
      type: `EcommComment`,
      contentDigest: createContentDigest(comment),
    },
  });

  return nodeData;
}
