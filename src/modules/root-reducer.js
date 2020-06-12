import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.slice';
import { cartReducer } from './cart/cart.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
