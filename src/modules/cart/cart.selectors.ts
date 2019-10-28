import { RootState } from '../../type';

const selectCartStore = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) =>
  selectCartStore(state).items;

export const selectCartItemCount = (state: RootState) =>
  selectCartItems(state).length;
