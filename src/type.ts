import { AnyAction } from 'redux';
import {
  ThunkAction as OriThunkAction,
  ThunkDispatch as OriThunkDispatch,
} from 'redux-thunk';
import { AuthState } from './modules/auth/auth.type';
import { CartState } from './modules/cart/cart.type';

export type RootState = {
  auth: AuthState;
  cart: CartState;
};

export type ThunkAction<Result> = OriThunkAction<
  Result,
  RootState,
  void,
  AnyAction
>;

export type ThunkDispatch = OriThunkDispatch<RootState, undefined, AnyAction>;

export type UiStatus = 'idle' | 'busy' | 'error';
