const selectProductStore = state => state.product;

export const selectProducts = state => {
  const productStore = selectProductStore(state);
  return productStore.productIds.map(id => productStore.productsByKey[id]);
};
