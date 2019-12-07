import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Spinner } from '../../../components/spinner';
import { RootState } from '../../../type';
import { selectCartItemCount, selectCartItems } from '../cart.selectors';
import { cartActions } from '../cart.slice';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
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
              </tbody>
            </table>
          </div>
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
