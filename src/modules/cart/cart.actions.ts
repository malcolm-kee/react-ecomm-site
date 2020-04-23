import { toast } from 'react-toastify';
import { ThunkAction } from '../../type';
import { selectCartTotal } from './cart.selectors';
import { cartActions } from './cart.slice';

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
