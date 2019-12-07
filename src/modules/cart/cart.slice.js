import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: DEFAULT_STATE,
  reducers: {
    addItem: (state, { payload: { product, qty = 1 } }) => {
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
    removeItem: (state, { payload }) => {
      state.items.splice(payload, 1);
    },
    incrementItemQty: (state, { payload }) => {
      state.items[payload].qty++;
    },
    decrementItemQty: (state, { payload }) => {
      state.items[payload].qty--;
    },
    clearCart: () => DEFAULT_STATE,
  },
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;
