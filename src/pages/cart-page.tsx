import React from 'react';
import { CartItems } from '../modules/cart/components/cart-items';

export function CartPage() {
  return (
    <div className="max-w-4xl mx-auto py-2 px-4">
      <h1 className="my-4 text-gray-700">Your Shopping Cart</h1>
      <CartItems />
    </div>
  );
}
