import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { cartActions } from '../cart.slice';
import { PaymentForm } from './payment-form';

test(`PaymentForm can be rendered`, () => {
  renderWithStateMgmt(<PaymentForm />);
});

test(`PaymentForm can be filled`, () => {
  const { getByText, getByLabelText } = renderWithStateMgmt(<PaymentForm />, {
    actions: [
      cartActions.addItem({
        product: {
          id: 1,
          price: 200,
        },
      }),
    ],
  });

  expect(getByText('RM 200.00')).not.toBeNull();
  expect(getByText('Pay').disabled).toBe(true);

  fireEvent.change(getByLabelText('Card Number'), {
    target: {
      value: '5572336646354657',
    },
  });
  fireEvent.change(getByLabelText('Name'), {
    target: {
      value: 'James Bond',
    },
  });
  fireEvent.change(getByLabelText('Valid Thru'), {
    target: {
      value: '12/25',
    },
  });
  fireEvent.change(getByLabelText('CVC'), {
    target: {
      value: '123',
    },
  });

  expect(getByText('Pay').disabled).toBe(false);
});
