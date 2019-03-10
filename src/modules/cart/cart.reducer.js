// eslint-disable-next-line no-unused-vars
import { Action, Reducer } from 'redux';
import * as actionKeys from './cart.action-keys';

const DEFAULT_STATE = {
  items: []
};

/**
 * @type {Reducer}
 * @param {Action} action
 */
export function cartReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionKeys.Add_Item:
      return {
        ...state,
        items: state.items.find(item => item.product === action.payload.product)
          ? state.items.map(item =>
              item.product === action.payload.product
                ? {
                    ...item,
                    qty: item.qty + 1
                  }
                : item
            )
          : state.items.concat({
              product: action.payload.product,
              qty: action.payload.qty
            })
      };

    case actionKeys.Remove_Item:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload)
      };

    case actionKeys.Increment_Item_Qty:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload
            ? {
                ...item,
                qty: item.qty + 1
              }
            : item
        )
      };

    case actionKeys.Decrement_Item_Qty:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload
            ? {
                ...item,
                qty: item.qty - 1
              }
            : item
        )
      };

    case actionKeys.Clear_Cart:
      return DEFAULT_STATE;

    default:
      return state;
  }
}
