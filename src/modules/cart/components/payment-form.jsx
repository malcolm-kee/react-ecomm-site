import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from '../../../components/alert';
import { Button } from '../../../components/button';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { formatMoney } from '../../../lib/format';
import { selectUser } from '../../auth/auth.selectors';
import { makePayment } from '../cart.actions';
import { selectCartTotal } from '../cart.selectors';

const CreditCard = React.lazy(() => import('../../../components/credit-card'));

const PaymentFormView = ({ defaultName, totalAmount, pay }) => {
  const [name, setName] = React.useState(defaultName);
  const [number, setNumber] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [focusedField, setFocusedField] = React.useState(undefined);

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
        onSubmit={(ev) => {
          ev.preventDefault();
          pay(name).then(() => setPaid(true));
        }}
      >
        <div className="text-center py-4">
          <div>Total Amount</div>
          <div className="text-3xl">RM {totalAmount}</div>
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
                    onChangeValue={(newExpiry) =>
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

const mapStates = (state) => {
  const user = selectUser(state);

  return {
    totalAmount: formatMoney(selectCartTotal(state)),
    defaultName: user ? user.name : '',
  };
};

const mapDispatch = (dispatch) => {
  return {
    pay: (name) => dispatch(makePayment({ name })),
  };
};

export const PaymentForm = connect(mapStates, mapDispatch)(PaymentFormView);
