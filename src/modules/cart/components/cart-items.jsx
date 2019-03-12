import React from 'react';
import { connect } from 'react-redux';
import { ProductImage } from '../../products/components/product-image';
import {
  incrementItemQty,
  decrementItemQty,
  removeItem
} from '../cart.actions';
import { selectCartItems, selectCartItemCount } from '../cart.selectors';

function CartItem({ index, item, onDecrement, onIncrement, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {item.product.images && (
          <ProductImage
            url={item.product.images['thumb-standard']}
            webpUrl={item.product.images['thumb-webp']}
            alt={item.product.name}
            width={188}
            height={188}
          />
        )}
      </td>
      <td>{item.product.name}</td>
      <td>
        <button
          onClick={onDecrement}
          className="btn btn-primary btn-sm"
          disabled={item.qty === 1}
          type="button"
        >
          -
        </button>{' '}
        {item.qty}{' '}
        <button
          onClick={onIncrement}
          className="btn btn-primary btn-sm"
          type="button"
        >
          +
        </button>
      </td>
      <td>
        <button
          onClick={onDelete}
          className="btn btn-danger btn-sm"
          type="button"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

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
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th />
              <th>Product</th>
              <th>Qty</th>
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
      )}
    </div>
  );
}

const mapStates = state => ({
  cartItems: selectCartItems(state),
  itemCount: selectCartItemCount(state)
});

const mapDispatch = dispatch => ({
  incrementItem: itemIndex => () => dispatch(incrementItemQty(itemIndex)),
  decrementItem: itemIndex => () => dispatch(decrementItemQty(itemIndex)),
  removeItem: itemIndex => () => dispatch(removeItem(itemIndex))
});

export const CartItems = connect(
  mapStates,
  mapDispatch
)(CartItemsContent);
