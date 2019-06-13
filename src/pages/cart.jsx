import React from 'react';
import { CartItems } from '../modules/cart/components/cart-items';

function CartPage() {
  return (
    <div className="container">
      <h1>Your Shopping Cart</h1>
      <CartItems />
    </div>
  );
}

export default CartPage;
