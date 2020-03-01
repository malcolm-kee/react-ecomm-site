import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { PaymentForm } from './payment-form';

test(`PaymentForm can be rendered`, () => {
  renderWithStateMgmt(<PaymentForm />);
});
