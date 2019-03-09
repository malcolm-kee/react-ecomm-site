import * as actionKeys from './product.action-keys';
import { selectCurrentPage } from './product.selectors';
import { getProducts } from './product.service';

export const addProducts = products => ({
  type: actionKeys.Add_Products,
  payload: products
});

export const loadProducts = () => (dispatch, getState) => {
  const page = selectCurrentPage(getState()) + 1;
  return getProducts(page).then(products => {
    dispatch(addProducts(products));
  });
};
