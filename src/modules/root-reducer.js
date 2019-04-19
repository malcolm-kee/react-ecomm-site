import { combineReducers } from 'redux';
import { productReducer } from './products/product.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer
});
