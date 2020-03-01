import * as React from 'react';
import { Focused } from 'react-credit-cards';
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
import { Spinner } from '../../../components/spinner';

const CreditCard = React.lazy(() => import('../../../components/credit-card'));

const PaymentFormView = (props: ConnectedProps<typeof connector>) => {
  const [name, setName] = React.useState(props.defaultName);
  const [number, setNumber] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [focusedField, setFocusedField] = React.useState<Focused | undefined>(
    undefined
  );

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
    <React.Suspense fallback={<Spinner />}>
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
          <div className="sm:flex">
            <div className="py-2">
              <CreditCard
                name={name}
                number={number}
                cvc={cvc}
                expiry={expiry}
                focused={focusedField}
              />
            </div>
            <div className="flex-1 sm:px-3">
              <TextField
                label="Card Number"
                value={number}
                onChangeValue={setNumber}
                onFocus={() => setFocusedField('number')}
                type="tel"
                autoComplete="cc-number"
              />
              <TextField
                label="Name"
                value={name}
                onChangeValue={setName}
                onFocus={() => setFocusedField('name')}
                autoComplete="cc-name"
              />
              <div>
                <div className="w-2/3 inline-block pr-2">
                  <TextField
                    label="Valid Thru"
                    value={expiry}
                    onChangeValue={newExpiry =>
                      setExpiry(
                        newExpiry.length === 2 ? newExpiry + '/' : newExpiry
                      )
                    }
                    placeholder="MM/YY"
                    onFocus={() => setFocusedField('expiry')}
                    maxLength={5}
                    autoComplete="cc-exp"
                  />
                </div>
                <div className="w-1/3 inline-block">
                  <TextField
                    label="CVC"
                    value={cvc}
                    onChangeValue={setCvc}
                    onFocus={() => setFocusedField('cvc')}
                    maxLength={3}
                    autoComplete="cc-csc"
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="text-right pt-4">
          <Button
            type="submit"
            color="primary"
            disabled={!name || !number || !expiry || !cvc}
            className="w-full"
          >
            Pay
          </Button>
        </div>
      </form>
    </React.Suspense>
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
