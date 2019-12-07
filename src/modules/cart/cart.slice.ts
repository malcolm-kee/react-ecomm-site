import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './cart.type';

const DEFAULT_STATE: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: DEFAULT_STATE,
  reducers: {
    addItem: (
      state,
      {
        payload: { product, qty = 1 },
      }: PayloadAction<{ product: CartItem['product']; qty?: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        item => item.product.id === product.id
      );

      if (itemIndex > -1) {
        state.items[itemIndex].qty += qty;
      } else {
        state.items.push({
          product,
          qty,
        });
      }
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.items.splice(payload, 1);
    },
    incrementItemQty: (state, { payload }: PayloadAction<number>) => {
      state.items[payload].qty++;
    },
    decrementItemQty: (state, { payload }: PayloadAction<number>) => {
      state.items[payload].qty--;
    },
    clearCart: () => DEFAULT_STATE,
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;
