import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductComment, ProductState } from './product.type';

const DEFAULT_STATE: ProductState = {
  productsByKey: {},
  productIds: [],
  productComments: {},
  currentPage: 0,
  hasMore: true,
  loadingProducts: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState: DEFAULT_STATE,
  reducers: {
    addProducts: (state, { payload }: PayloadAction<Product[]>) => {
      payload.forEach((product) => {
        state.productsByKey[product.id] = product;
        state.productIds.push(product.id);
      });
      state.currentPage++;
      state.hasMore = payload.length !== 0;
      state.loadingProducts = false;
    },
    loadingProducts: (state) => {
      state.loadingProducts = true;
    },
    setProductDetails: (state, { payload }: PayloadAction<Product>) => {
      state.productsByKey[payload.id] = payload;
    },
    setProductComments: (
      state,
      {
        payload,
      }: PayloadAction<{ productId: number; comments: ProductComment[] }>
    ) => {
      state.productComments[payload.productId] = payload.comments;
    },
    addProductComment: (state, { payload }: PayloadAction<ProductComment>) => {
      if (state.productComments[payload.productId]) {
        state.productComments[payload.productId].push(payload);
      } else {
        state.productComments[payload.productId] = [payload];
      }
    },
  },
});

export const productReducer = productSlice.reducer;

export const productActions = productSlice.actions;
