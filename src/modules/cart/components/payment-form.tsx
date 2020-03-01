import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../../../components/button';
import { formatMoney } from '../../../lib/format';
import { RootState, ThunkDispatch } from '../../../type';
import { selectCartTotal } from '../cart.selectors';
import { selectUser } from '../../auth/auth.selectors';
import { TextField } from '../../../components/text-field';
import { makePayment } from '../cart.actions';
import { Alert } from '../../../components/alert';
import { Link } from 'react-router-dom';

const PaymentFormView = (props: ConnectedProps<typeof connector>) => {
  const [name, setName] = React.useState(props.defaultName);

  const [paid, setPaid] = React.useState(false);

  return paid ? (
    <Alert color="success">
      <p className="text-xl text-center">Paid</p>
      <div className="text-center py-3">
        <Link to="/" className="text-blue-500">
          Back to Home
        </Link>
      </div>
    </Alert>
  ) : (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        props.pay(name).then(() => setPaid(true));
      }}
    >
      <div className="text-center py-4">
        <div>Total Amount</div>
        <div className="text-3xl">RM {props.totalAmount}</div>
      </div>
      <fieldset>
        <legend className="pl-2 w-full border-b border-gray-400 font-semibold leading-loose">
          Billing Details
        </legend>
        <TextField label="Name" value={name} onChangeValue={setName} />
      </fieldset>
      <div className="text-right pt-4">
        <Button
          type="submit"
          color="primary"
          disabled={!name}
          className="w-full"
        >
          Pay
        </Button>
      </div>
    </form>
  );
};

const connector = connect(
  (state: RootState) => {
    const user = selectUser(state);

    return {
      totalAmount: formatMoney(selectCartTotal(state)),
      defaultName: user ? user.name : '',
    };
  },
  (dispatch: ThunkDispatch) => {
    return {
      pay: (name: string) => dispatch(makePayment({ name })),
    };
  }
);

export const PaymentForm = connector(PaymentFormView);
