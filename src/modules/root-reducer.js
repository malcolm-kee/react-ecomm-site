import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { productReducer } from './products/product.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer
});
