import * as actionKeys from './product.action-keys';

const DEFAULT_STATE = {
  productsByKey: {},
  productIds: [],
  productComments: {},
  currentPage: 0,
  hasMore: true
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
        productIds: state.productIds.concat(
          action.payload.map(product => product.id)
        ),
        currentPage: state.currentPage + 1,
        hasMore: action.payload.length !== 0
      };

    case actionKeys.Set_Product_Details:
      return {
        ...state,
        productsByKey: {
          ...state.productsByKey,
          [action.payload.id]: action.payload
        }
      };

    case actionKeys.Set_Product_Comments:
      return {
        ...state,
        productComments: {
          ...state.productComments,
          [action.payload.productId]: action.payload.comments
        }
      };

    case actionKeys.Add_Product_Comment:
      return {
        ...state,
        productComments: {
          ...state.productComments,
          [action.payload.productId]: (
            state.productComments[action.payload.productId] || []
          ).concat(action.payload)
        }
      };

    default:
      return state;
  }
}
