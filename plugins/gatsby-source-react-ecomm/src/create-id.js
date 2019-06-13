exports.createProductNodeId = (productId, createNodeId) =>
  createNodeId(`ecomm-product-${productId}`);

exports.createCommentNodeId = (commentId, createNodeId) =>
  createNodeId(`ecomm-comment-${commentId}`);
