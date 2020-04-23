import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../type';

const selectCartStore = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) =>
  selectCartStore(state).items;

export const selectCartItemCount = (state: RootState) =>
  selectCartItems(state).length;

export const selectCartTotal = createSelector(selectCartStore, (cartState) =>
  cartState.items.reduce(
    (total, item) => total + item.qty * Number(item.product.price),
    0
  )
);
