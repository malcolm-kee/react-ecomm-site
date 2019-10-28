import { selectProduct } from '../products/product.selectors';
import { cartActions } from './cart.slice';

export const addProductToCart = (productId, qty) => (dispatch, getState) =>
  dispatch(
    cartActions.addItem({
      product: selectProduct(getState(), productId),
      qty
    })
  );
