const selectCartStore = state => state.cart;

export const selectCartItems = state => selectCartStore(state).items;

export const selectCartItemCount = state => selectCartItems(state).length;
