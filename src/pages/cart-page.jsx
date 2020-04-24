import * as React from 'react';
import { Seo } from '../components/seo';
import { CartItems } from '../modules/cart/components/cart-items';

export function CartPage() {
  return (
    <div className="max-w-4xl mx-auto py-2 px-4">
      <Seo title="Shopping Cart - Shopit" />
      <h1 className="my-4 text-gray-700">Your Shopping Cart</h1>
      <CartItems />
    </div>
  );
}
