import { ThunkAction } from '../../type';
import { selectProduct } from '../products/product.selectors';
import { cartActions } from './cart.slice';

export const addProductToCart = (
  productId: number,
  qty?: number
): ThunkAction<void> => (dispatch, getState) =>
  dispatch(
    cartActions.addItem({
      product: selectProduct(getState(), productId),
      qty,
    })
  );
