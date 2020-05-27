import { renderWithStateMgmtAndRouter, user } from 'lib/test-util';
import * as React from 'react';
import { cartActions } from '../cart.slice';
import { PaymentForm } from './payment-form';

test(`can complete make payment`, async () => {
  const helpers = renderWithStateMgmtAndRouter(<PaymentForm />, {
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

  expect(helpers.getByText('Pay')).toBeDisabled();

  await user.type(helpers.getByLabelText('Card Number'), '5521783746553547');
  await user.type(helpers.getByLabelText('Name'), 'Malcolm Kee');
  await user.type(helpers.getByLabelText('Valid Thru'), '05/22');
  await user.type(helpers.getByLabelText('CVC'), '123');
  user.click(helpers.getByText('Pay'));

  const successMessage = await helpers.findByText('Paid');

  expect(successMessage).toBeVisible();
  expect(helpers.getByText('Back to Home')).toBeVisible();
});
