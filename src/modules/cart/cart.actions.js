import { toast } from 'react-toastify';
import { selectProduct } from '../products/product.selectors';
import { selectCartTotal } from './cart.selectors';
import { cartActions } from './cart.slice';

export const addProductToCart = (productId, qty) => (dispatch, getState) =>
  dispatch(
    cartActions.addItem({
      product: selectProduct(getState(), productId),
      qty,
    })
  );

export const makePayment = ({ name }) => (dispatch, getState) => {
  const total = selectCartTotal(getState());
  toast(`Paid ${total} by ${name}`, {
    type: 'success',
    autoClose: 2000,
  });
  dispatch(cartActions.clearCart());

  return Promise.resolve();
};
