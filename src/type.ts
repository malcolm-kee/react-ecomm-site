import { AuthState } from './modules/auth/auth.type';
import { CartState } from './modules/cart/cart.type';
import { MarketingState } from './modules/marketing/marketing.type';
import { ProductState } from './modules/products/product.type';
import { ThunkAction as OriThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export type RootState = {
  auth: AuthState;
  cart: CartState;
  marketing: MarketingState;
  product: ProductState;
};

export type ThunkAction<Result> = OriThunkAction<
  Result,
  RootState,
  void,
  AnyAction
>;
