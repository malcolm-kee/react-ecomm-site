import React from 'react';
import { Seo } from '../components/seo';
import { usePlainLayout } from '../hooks/use-layout';
import { PaymentForm } from '../modules/cart/components/payment-form';

export const PaymentPage = () => {
  usePlainLayout();

  return (
    <div className="py-6 px-2">
      <Seo title="Checkout" />
      <div className="max-w-3xl mx-auto p-6 shadow-lg bg-white">
        <PaymentForm />
      </div>
    </div>
  );
};
