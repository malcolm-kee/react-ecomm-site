import { ThunkAction } from '../../type';
import { selectProduct } from '../products/product.selectors';
import { cartActions } from './cart.slice';
import { selectCartTotal } from './cart.selectors';
import { toast } from 'react-toastify';

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

type PaymentDetails = {
  name: string;
};

export const makePayment = (
  details: PaymentDetails
): ThunkAction<Promise<unknown>> => (dispatch, getState) => {
  const total = selectCartTotal(getState());
  toast(`Paid ${total} by ${details.name}`, {
    type: 'success',
    autoClose: 2000,
  });
  dispatch(cartActions.clearCart());

  return Promise.resolve();
};
