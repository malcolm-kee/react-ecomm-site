import { combineReducers } from 'redux';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  cart: cartReducer
});
