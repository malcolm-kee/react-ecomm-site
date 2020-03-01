import * as React from 'react';
import { PaymentForm } from '../modules/cart/components/payment-form';
import { usePlainLayout } from '../hooks/use-layout';

export const PaymentPage = () => {
  usePlainLayout();

  return (
    <div className="py-6 px-2">
      <div className="max-w-md mx-auto p-6 shadow-lg bg-white">
        <PaymentForm />
      </div>
    </div>
  );
};
