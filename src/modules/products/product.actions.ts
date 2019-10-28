import { ThunkAction } from '../../type';
import { selectCurrentPage } from './product.selectors';
import {
  createProductComment,
  getProduct,
  getProductComments,
  getProducts
} from './product.service';
import { productActions } from './product.slice';
import { ProductComment } from './product.type';

export const loadProducts = (): ThunkAction<void> => (dispatch, getState) => {
  const page = selectCurrentPage(getState()) + 1;
  dispatch(productActions.loadingProducts());
  return getProducts(page).then(products => {
    dispatch(productActions.addProducts(products));
    return products;
  });
};

export const loadProductDetail = (
  productId: number
): ThunkAction<void> => dispatch => {
  return getProduct(productId).then(product =>
    dispatch(productActions.setProductDetails(product))
  );
};

export const loadProductComments = (
  productId: number
): ThunkAction<Promise<unknown>> => dispatch => {
  return getProductComments(productId).then(comments =>
    dispatch(productActions.setProductComments({ productId, comments }))
  );
};

export const submitAddProductComment = (
  comment: Omit<ProductComment, 'id' | 'userId'>
): ThunkAction<Promise<unknown>> => dispatch => {
  return createProductComment(comment).then(returnedComment =>
    dispatch(productActions.addProductComment(returnedComment))
  );
};
