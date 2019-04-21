import { selectProduct } from '../products/product.selectors';
import * as actionKeys from './cart.action-keys';

export const addItem = (product, qty = 1) => ({
  type: actionKeys.Add_Item,
  payload: {
    product,
    qty
  }
});

export const removeItem = itemIndex => ({
  type: actionKeys.Remove_Item,
  payload: itemIndex
});

export const incrementItemQty = itemIndex => ({
  type: actionKeys.Increment_Item_Qty,
  payload: itemIndex
});

export const decrementItemQty = itemIndex => ({
  type: actionKeys.Decrement_Item_Qty,
  payload: itemIndex
});

export const clearCart = () => ({
  type: actionKeys.Clear_Cart
});

export const addProductToCart = (productId, qty) => (dispatch, getState) =>
  dispatch(addItem(selectProduct(getState(), productId), qty));
