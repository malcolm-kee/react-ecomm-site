import { RootState } from '../../type';

const selectProductStore = (state: RootState) => state.product;

export const selectProducts = (state: RootState) => {
  const productStore = selectProductStore(state);
  return productStore.productIds.map((id) => productStore.productsByKey[id]);
};

export const selectProductIsLoading = (state: RootState) =>
  selectProductStore(state).loadingProducts;

export const selectProduct = (state: RootState, productId: number) =>
  selectProductStore(state).productsByKey[productId];

export const selectProductComments = (state: RootState, productId: number) =>
  selectProductStore(state).productComments[productId];

export const selectCurrentPage = (state: RootState) =>
  selectProductStore(state).currentPage;

export const selectHasMoreProduct = (state: RootState) =>
  selectProductStore(state).hasMore;
