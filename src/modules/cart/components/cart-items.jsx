import { inject, observer } from 'mobx-react';
import React from 'react';
import { ErrorBoundary } from '../../../components/error-boundary';
import { Spinner } from '../../../components/spinner';
import styles from './cart-items.module.scss';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
);

const CartTableItem = React.lazy(() =>
  import(/* webpackChunkName: "CartTableItem" */ './cart-table-item')
);

function CartItemsContent({
  cart: { items, isEmpty, removeItem, totalPrice },
}) {
  return (
    <div className="cart-items">
      {isEmpty ? (
        <p>There is nothing in your shopping cart.</p>
      ) : (
        <React.Suspense fallback={<Spinner />}>
          <ErrorBoundary>
            <div className="hidden sm:block overflow-x-auto overflow-y-hidden w-full">
              <table
                className={`table-fixed w-full max-w-full ${styles.table}`}
              >
                <thead>
                  <tr>
                    <th className="w-8">#</th>
                    <th />
                    <th>Product</th>
                    <th className="text-right">Unit Price (RM)</th>
                    <th className="w-24">Qty</th>
                    <th className="text-right">Price (RM)</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <CartTableItem
                      onDelete={() => removeItem(item)}
                      index={index}
                      key={index}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={5} className="text-right py-2">
                      Grand Total
                    </th>
                    <th className="text-right text-xl py-2">{totalPrice}</th>
                    <th />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="sm:hidden">
              {items.map((item, index) => (
                <CartItem
                  onDelete={() => removeItem(item)}
                  index={index}
                  key={index}
                />
              ))}
            </div>
          </ErrorBoundary>
        </React.Suspense>
      )}
    </div>
  );
}
export const CartItems = inject('cart')(observer(CartItemsContent));
