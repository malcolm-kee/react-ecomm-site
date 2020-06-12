import { xFetchJson } from 'lib/ajax';

const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;
const PRODUCT_COMMENT_BASE_URL = process.env.REACT_APP_PRODUCT_COMMENT_BASE_URL;

export function getProducts({ before, limit } = {}) {
  return xFetchJson(PRODUCT_BASE_URL, {
    params: {
      before,
      limit,
    },
  });
}

export function getProduct(productId) {
  return xFetchJson(`${PRODUCT_BASE_URL}/${productId}`);
}

export function createProductComment(productId, comment) {
  return xFetchJson(`${PRODUCT_COMMENT_BASE_URL}/${productId}`, {
    method: 'POST',
    data: comment,
  });
}
