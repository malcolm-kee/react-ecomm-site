import { toast } from 'components/toast';
import { selectCartTotal } from './cart.selectors';
import { cartActions } from './cart.slice';

export const makePayment = ({ name }) => (dispatch, getState) => {
  const total = selectCartTotal(getState());
  toast(`Paid ${total} by ${name}`, {
    type: 'success',
    autoClose: 2000,
  });
  dispatch(cartActions.clearCart());

  return Promise.resolve();
};
