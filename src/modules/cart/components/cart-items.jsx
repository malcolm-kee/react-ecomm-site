import { inject, observer } from 'mobx-react';
import React from 'react';
import { Spinner } from '../../../components/spinner';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
);

function CartItemsContent({ cart: { items, isEmpty, removeItem } }) {
  return (
    <div className="cart-items">
      {isEmpty ? (
        <p>There is nothing in your shopping cart.</p>
      ) : (
        <React.Suspense fallback={<Spinner />}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th />
                  <th>Product</th>
                  <th className="text-right">Unit Price (RM)</th>
                  <th>Qty</th>
                  <th className="text-right">Price (RM)</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <CartItem
                    onDelete={() => removeItem(item)}
                    index={index}
                    key={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </React.Suspense>
      )}
    </div>
  );
}
export const CartItems = inject('cart')(observer(CartItemsContent));
