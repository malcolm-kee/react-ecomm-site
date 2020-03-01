import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../../../components/button';
import { formatMoney } from '../../../lib/format';
import { RootState } from '../../../type';
import { selectCartTotal } from '../cart.selectors';
import { selectUser } from '../../auth/auth.selectors';
import { TextField } from '../../../components/text-field';

const PaymentFormView = (props: ConnectedProps<typeof connector>) => {
  const [name, setName] = React.useState(props.defaultName);

  return (
    <form>
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
        <Button color="primary" disabled={!name} className="w-full">
          Pay
        </Button>
      </div>
    </form>
  );
};

const connector = connect((state: RootState) => {
  const user = selectUser(state);

  return {
    totalAmount: formatMoney(selectCartTotal(state)),
    defaultName: user ? user.name : '',
  };
});

export const PaymentForm = connector(PaymentFormView);
