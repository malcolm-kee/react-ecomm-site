import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.slice';
import { cartReducer } from './cart/cart.slice';
import { marketingReducer } from './marketing/marketing.reducer';
import { productReducer } from './products/product.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  marketing: marketingReducer,
  product: productReducer
});
