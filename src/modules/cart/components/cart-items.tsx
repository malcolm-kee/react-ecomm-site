import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ErrorBoundary } from '../../../components/error-boundary';
import { Spinner } from '../../../components/spinner';
import { RootState } from '../../../type';
import { selectCartItemCount, selectCartItems } from '../cart.selectors';
import { cartActions } from '../cart.slice';
import styles from './cart-items.module.scss';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
);

const CartTableItem = React.lazy(() =>
  import(/* webpackChunkName: "CartTableItem" */ './cart-table-item')
);

type ReduxProps = ConnectedProps<typeof connector>;

function CartItemsContent({
  cartItems,
  itemCount,
  incrementItem,
  decrementItem,
  removeItem,
}: ReduxProps) {
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
            </div>
          </ErrorBoundary>
        </React.Suspense>
      )}
    </div>
  );
}

const mapStates = (state: RootState) => ({
  cartItems: selectCartItems(state),
  itemCount: selectCartItemCount(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  incrementItem: (itemIndex: number) => () =>
    dispatch(cartActions.incrementItemQty(itemIndex)),
  decrementItem: (itemIndex: number) => () =>
    dispatch(cartActions.decrementItemQty(itemIndex)),
  removeItem: (itemIndex: number) => () =>
    dispatch(cartActions.removeItem(itemIndex)),
});

const connector = connect(mapStates, mapDispatch);

export const CartItems = connector(CartItemsContent);
