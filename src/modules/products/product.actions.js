import * as actionKeys from './product.action-keys';
import { selectCurrentPage } from './product.selectors';
import {
  getProducts,
  getProduct,
  getProductComments,
  createProductComment
} from './product.service';

export const addProducts = products => ({
  type: actionKeys.Add_Products,
  payload: products
});

export const loadingProducts = () => ({
  type: actionKeys.Loading_Products
});

export const setProductDetails = product => ({
  type: actionKeys.Set_Product_Details,
  payload: product
});

export const setProductComments = (productId, comments) => ({
  type: actionKeys.Set_Product_Comments,
  payload: { productId, comments }
});

export const addProductComment = comment => ({
  type: actionKeys.Add_Product_Comment,
  payload: comment
});

export const loadProducts = () => (dispatch, getState) => {
  const page = selectCurrentPage(getState()) + 1;
  dispatch(loadingProducts());
  return getProducts(page).then(products => dispatch(addProducts(products)));
};

export const loadProductDetail = productId => dispatch => {
  return getProduct(productId).then(product =>
    dispatch(setProductDetails(product))
  );
};

export const loadProductComments = productId => dispatch => {
  return getProductComments(productId).then(comments =>
    dispatch(setProductComments(productId, comments))
  );
};

export const submitAddProductComment = comment => dispatch => {
  return createProductComment(comment).then(returnedComment =>
    dispatch(addProductComment(returnedComment))
  );
};
