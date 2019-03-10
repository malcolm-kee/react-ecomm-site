const selectProductStore = state => state.product;

export const selectProducts = state => {
  const productStore = selectProductStore(state);
  return productStore.productIds.map(id => productStore.productsByKey[id]);
};

export const selectProduct = (state, productId) =>
  selectProductStore(state).productsByKey[productId];

export const selectProductComments = (state, productId) =>
  selectProductStore(state).productComments[productId];

export const selectCurrentPage = state => selectProductStore(state).currentPage;

export const selectHasMoreProduct = state => selectProductStore(state).hasMore;
