import * as actionKeys from './product.action-keys';

const DEFAULT_STATE = {
  productsByKey: {},
  productIds: []
};

export function productReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionKeys.Add_Products:
      return {
        ...state,
        productsByKey: {
          ...state.productsByKey,
          ...action.payload.reduce(
            (result, product) => ({
              ...result,
              [product.id]: product
            }),
            {}
          )
        },
        productIds: action.payload.map(product => product.id)
      };

    default:
      return state;
  }
}
