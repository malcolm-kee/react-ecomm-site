import { createSlice } from 'redux-starter-kit';

const DEFAULT_STATE = {
  productsByKey: {},
  productIds: [],
  productComments: {},
  currentPage: 0,
  hasMore: true,
  loadingProducts: false
};

const productSlice = createSlice({
  name: 'product',
  initialState: DEFAULT_STATE,
  reducers: {
    addProducts: (state, { payload }) => {
      payload.forEach(product => {
        state.productsByKey[product.id] = product;
        state.productIds.push(product.id);
      });
      state.currentPage++;
      state.hasMore = payload.length !== 0;
      state.loadingProducts = false;
    },
    loadingProducts: state => {
      state.loadingProducts = true;
    },
    setProductDetails: (state, { payload }) => {
      state.productsByKey[payload.id] = payload;
    },
    setProductComments: (state, { payload }) => {
      state.productComments[payload.productId] = payload.comments;
    },
    addProductComment: (state, { payload }) => {
      if (state.productComments[payload.productId]) {
        state.productComments[payload.productId].push(payload);
      } else {
        state.productComments[payload.productId] = [payload];
      }
    }
  }
});

export const productReducer = productSlice.reducer;

export const productActions = productSlice.actions;
