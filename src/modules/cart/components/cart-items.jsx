import React from 'react';
import { connect } from 'react-redux';
import { ErrorBoundary } from '../../../components/error-boundary';
import { Spinner } from '../../../components/spinner';
import { formatMoney } from '../../../lib/format';
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from '../cart.selectors';
import { cartActions } from '../cart.slice';
import styles from './cart-items.module.scss';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
);

const CartTableItem = React.lazy(() =>
  import(/* webpackChunkName: "CartTableItem" */ './cart-table-item')
);

function CartItemsContent({
  cartItems,
  itemCount,
  incrementItem,
  decrementItem,
  removeItem,
  total,
}) {
  return (
    <div className="cart-items">
      {itemCount === 0 ? (
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
                  {cartItems.map((item, index) => (
                    <CartTableItem
                      item={item}
                      onIncrement={incrementItem(index)}
                      onDecrement={decrementItem(index)}
                      onDelete={removeItem(index)}
                      index={index}
                      key={index}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="text-right text-xl">
                      Total
                    </td>
                    <td className="text-right font-bold text-xl">
                      {formatMoney(total)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="sm:hidden">
              {cartItems.map((item, index) => (
                <CartItem
                  item={item}
                  onIncrement={incrementItem(index)}
                  onDecrement={decrementItem(index)}
                  onDelete={removeItem(index)}
                  index={index}
                  key={index}
                />
              ))}
              <div className="flex justify-between">
                <div className="text-2xl font-semibold">Total</div>
                <div className="text-lg">
                  RM{' '}
                  <output className="text-2xl font-semibold">
                    {formatMoney(total)}
                  </output>
                </div>
              </div>
            </div>
          </ErrorBoundary>
        </React.Suspense>
      )}
    </div>
  );
}

const mapStates = state => ({
  cartItems: selectCartItems(state),
  itemCount: selectCartItemCount(state),
  total: selectCartTotal(state),
});

const mapDispatch = dispatch => ({
  incrementItem: itemIndex => () =>
    dispatch(cartActions.incrementItemQty(itemIndex)),
  decrementItem: itemIndex => () =>
    dispatch(cartActions.decrementItemQty(itemIndex)),
  removeItem: itemIndex => () => dispatch(cartActions.removeItem(itemIndex)),
});

const connector = connect(mapStates, mapDispatch);

export const CartItems = connector(CartItemsContent);
