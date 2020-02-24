import { createSelector } from '@reduxjs/toolkit';

const selectCartStore = state => state.cart;

export const selectCartItems = state => selectCartStore(state).items;

export const selectCartItemCount = state => selectCartItems(state).length;

export const selectCartTotal = createSelector(selectCartStore, cartState =>
  cartState.items.reduce(
    (total, item) => total + item.qty * Number(item.product.price),
    0
  )
);
