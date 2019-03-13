import { AuthStatus } from './auth.constants';
import * as actionKeys from './auth.action-keys';

const DEFAULT_STATE = {
  status: AuthStatus.Authenticating,
  user: null,
  error: ''
};

export function authReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionKeys.AUTHENTICATING:
      return {
        ...state,
        error: '',
        status: AuthStatus.Authenticating
      };

    case actionKeys.LOGIN:
      return {
        ...state,
        error: '',
        status: AuthStatus.Authenticated,
        user: action.payload
      };

    case actionKeys.LOGOUT:
      return {
        ...state,
        error: '',
        status: AuthStatus.Anonymous,
        user: null
      };

    case actionKeys.AUTH_ERROR:
      return {
        ...state,
        status: AuthStatus.Anonymous,
        error: action.payload
      };

    default:
      return state;
  }
}
