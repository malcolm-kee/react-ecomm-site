import { fetchJson } from '../../lib/ajax';
import { Product, ProductComment } from './product.type';

const PRODUCT_BASE_URL =
  process.env.REACT_APP_PRODUCT_BASE_URL ||
  'https://ecomm-db.herokuapp.com/products';
const PRODUCT_COMMENT_BASE_URL =
  process.env.REACT_APP_PRODUCT_COMMENT_BASE_URL ||
  'https://ecomm-db.herokuapp.com/comments';

export function getProducts(page: number, limit = 12): Promise<Product[]> {
  return fetchJson(PRODUCT_BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
}

export function getProduct(productId: number): Promise<Product> {
  return fetchJson(`${PRODUCT_BASE_URL}/${productId}`);
}

export function getProductComments(
  productId: number
): Promise<ProductComment[]> {
  return fetchJson(PRODUCT_COMMENT_BASE_URL, {
    params: {
      productId,
    },
  });
}

export function createProductComment(
  comment: Omit<ProductComment, 'id' | 'userId'>
): Promise<ProductComment> {
  return fetchJson(PRODUCT_COMMENT_BASE_URL, {
    method: 'POST',
    data: comment,
  });
}
