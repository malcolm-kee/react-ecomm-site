import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../../components/button';
import { TextField } from '../../../components/text-field';
import { formatMoney } from '../../../lib/format';
import { selectUser } from '../../auth/auth.selectors';
import { selectCartTotal } from '../cart.selectors';

const PaymentFormView = ({ defaultName, totalAmount }) => {
  const [name, setName] = React.useState(defaultName);

  return (
    <form>
      <div className="text-center py-4">
        <div>Total Amount</div>
        <div className="text-3xl">RM {totalAmount}</div>
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

const mapStates = state => {
  const user = selectUser(state);

  return {
    totalAmount: formatMoney(selectCartTotal(state)),
    defaultName: user ? user.name : '',
  };
};

export const PaymentForm = connect(mapStates)(PaymentFormView);
