import { xFetchJson } from 'lib/ajax';
import { Product, ProductComment } from './product.type';

const PRODUCT_BASE_URL = process.env.NEXT_PUBLIC_PRODUCT_BASE_URL as string;
const PRODUCT_COMMENT_BASE_URL = process.env
  .NEXT_PUBLIC_PRODUCT_COMMENT_BASE_URL as string;

export function getProducts(page: number, limit = 12): Promise<Product[]> {
  return xFetchJson(PRODUCT_BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
}

export function getProduct(productId: number): Promise<Product> {
  return xFetchJson(`${PRODUCT_BASE_URL}/${productId}`);
}

export function getProductComments(
  productId: number
): Promise<ProductComment[]> {
  return xFetchJson(PRODUCT_COMMENT_BASE_URL, {
    params: {
      productId,
    },
  });
}

export function createProductComment(
  comment: Omit<ProductComment, 'id' | 'userId'>
): Promise<ProductComment> {
  return xFetchJson(PRODUCT_COMMENT_BASE_URL, {
    method: 'POST',
    data: comment,
  });
}
