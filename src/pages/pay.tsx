import Head from 'next/head';
import * as React from 'react';
import { usePlainLayout } from '../hooks/use-layout';
import { PaymentForm } from '../modules/cart/components/payment-form';

export default function PaymentPage() {
  usePlainLayout();

  return (
    <div className="py-6 px-2">
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="max-w-3xl mx-auto p-6 shadow-lg bg-white">
        <PaymentForm />
      </div>
    </div>
  );
}
