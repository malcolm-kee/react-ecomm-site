import { fetchJson } from '../../lib/ajax';

const PRODUCT_BASE_URL = 'https://ecomm-db.herokuapp.com/products';
const PRODUCT_COMMENT_BASE_URL = 'https://ecomm-db.herokuapp.com/comments';

export function getProducts(page, limit = 12) {
  return fetchJson(PRODUCT_BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
}

export function getProduct(productId) {
  return fetchJson(`${PRODUCT_BASE_URL}/${productId}`);
}

export function getProductComments(productId) {
  return fetchJson(PRODUCT_COMMENT_BASE_URL, {
    params: {
      productId,
    },
  });
}

export function createProductComment(comment) {
  return fetchJson(PRODUCT_COMMENT_BASE_URL, {
    method: 'POST',
    data: comment,
  });
}
