import * as actionKeys from './product.action-keys';
import { selectCurrentPage } from './product.selectors';
import { getProducts, getProduct } from './product.service';

export const addProducts = products => ({
  type: actionKeys.Add_Products,
  payload: products
});

export const setProductDetails = product => ({
  type: actionKeys.Set_Product_Details,
  payload: product
});

export const loadProducts = () => (dispatch, getState) => {
  const page = selectCurrentPage(getState()) + 1;
  return getProducts(page).then(products => {
    dispatch(addProducts(products));
  });
};

export const loadProductDetail = productId => dispatch => {
  return getProduct(productId).then(product =>
    dispatch(setProductDetails(product))
  );
};
