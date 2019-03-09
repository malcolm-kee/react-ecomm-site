import * as actionKeys from './product.action-keys';
import { getProducts } from './product.service';

export const addProducts = products => ({
  type: actionKeys.Add_Products,
  payload: products
});

export const loadProducts = (page = 1) => dispatch => {
  return getProducts(page).then(products => {
    dispatch(addProducts(products));
  });
};
