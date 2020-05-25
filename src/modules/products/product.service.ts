import { xFetchJson } from 'lib/ajax';
import { Product, ProductComment } from './product.type';

const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL as string;
const PRODUCT_COMMENT_BASE_URL = process.env
  .REACT_APP_PRODUCT_COMMENT_BASE_URL as string;

export function getProducts({
  before,
  limit = 12,
}: { before?: string; limit?: number } = {}): Promise<Product[]> {
  return xFetchJson(PRODUCT_BASE_URL, {
    params: {
      before,
      limit,
    },
  });
}

export function getProduct(productId: string): Promise<Product> {
  return xFetchJson(`${PRODUCT_BASE_URL}/${productId}`);
}

export function createProductComment(
  productId: string,
  comment: Pick<ProductComment, 'userName' | 'content' | 'rating'>
): Promise<ProductComment> {
  return xFetchJson(`${PRODUCT_COMMENT_BASE_URL}/${productId}`, {
    method: 'POST',
    data: {
      userName: comment.userName,
      content: comment.content,
      rating: comment.rating,
    },
  });
}
