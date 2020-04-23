import { selectCurrentPage } from './product.selectors';
import {
  createProductComment,
  getProduct,
  getProductComments,
  getProducts,
} from './product.service';
import { productActions } from './product.slice';

export const loadProducts = () => (dispatch, getState) => {
  const page = selectCurrentPage(getState()) + 1;
  dispatch(productActions.loadingProducts());
  return getProducts(page).then((products) =>
    dispatch(productActions.addProducts(products))
  );
};

export const loadProductDetail = (productId) => (dispatch) => {
  return getProduct(productId).then((product) =>
    dispatch(productActions.setProductDetails(product))
  );
};

export const loadProductComments = (productId) => (dispatch) => {
  return getProductComments(productId).then((comments) =>
    dispatch(productActions.setProductComments({ productId, comments }))
  );
};

export const submitAddProductComment = (comment) => (dispatch) => {
  return createProductComment(comment).then((returnedComment) =>
    dispatch(productActions.addProductComment(returnedComment))
  );
};
