import { ajax } from '../../lib/ajax';

const PRODUCT_BASE_URL = 'https://ecomm-db.herokuapp.com/products';

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
