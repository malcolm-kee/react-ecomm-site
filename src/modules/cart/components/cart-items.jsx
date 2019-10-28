import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../../../components/spinner';
import { cartActions } from '../cart.slice';
import { selectCartItemCount, selectCartItems } from '../cart.selectors';

const CartItem = React.lazy(() =>
  import(/* webpackChunkName: "CartItem" */ './cart-item')
);

function CartItemsContent({
  cartItems,
  itemCount,
  incrementItem,
  decrementItem,
  removeItem
}) {
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

const mapStates = state => ({
  cartItems: selectCartItems(state),
  itemCount: selectCartItemCount(state)
});

const mapDispatch = dispatch => ({
  incrementItem: itemIndex => () =>
    dispatch(cartActions.incrementItemQty(itemIndex)),
  decrementItem: itemIndex => () =>
    dispatch(cartActions.decrementItemQty(itemIndex)),
  removeItem: itemIndex => () => dispatch(cartActions.removeItem(itemIndex))
});

export const CartItems = connect(
  mapStates,
  mapDispatch
)(CartItemsContent);
