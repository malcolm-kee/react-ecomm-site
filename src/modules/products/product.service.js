import { ajax } from '../../lib/ajax';

const PRODUCT_BASE_URL = 'https://ecomm-db.herokuapp.com/products';
const PRODUCT_COMMENT_BASE_URL = 'https://ecomm-db.herokuapp.com/comments';

export function getProducts(page, limit = 10) {
  return ajax({
    url: PRODUCT_BASE_URL,
    params: {
      _page: page,
      _limit: limit
    }
  });
}

export function getProduct(productId) {
  return ajax(`${PRODUCT_BASE_URL}/${productId}`);
}

export function getProductComments(productId) {
  return ajax({
    url: PRODUCT_COMMENT_BASE_URL,
    params: {
      productId
    }
  });
}

export function createProductComment(comment) {
  return ajax({
    method: 'POST',
    url: PRODUCT_COMMENT_BASE_URL,
    data: comment
  });
}
