import React from 'react';
import { renderWithStateMgmtAndRouter, user } from '../../../lib/test-util';
import { cartActions } from '../cart.slice';
import { PaymentForm } from './payment-form';

test(`can complete make payment`, async () => {
  const {
    getByLabelText,
    getByText,
    findByText,
  } = renderWithStateMgmtAndRouter(<PaymentForm />, {
    actions: [
      cartActions.addItem({
        product: {
          id: 1,
          price: 200,
          name: 'Product X',
        },
      }),
      cartActions.addItem({
        product: {
          id: 2,
          price: 100,
          name: 'Product Y',
        },
      }),
    ],
  });

  expect(getByText('Pay')).toBeDisabled();

  await user.type(getByLabelText('Card Number'), '5521783746553547');
  await user.type(getByLabelText('Name'), 'Malcolm Kee');
  await user.type(getByLabelText('Valid Thru'), '05/22');
  await user.type(getByLabelText('CVC'), '123');
  user.click(getByText('Pay'));

  const successMessage = await findByText('Paid');

  expect(successMessage).toBeVisible();
  expect(getByText('Back to Home')).toBeVisible();
});
