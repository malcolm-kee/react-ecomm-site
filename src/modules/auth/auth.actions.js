import * as actionKeys from './auth.action-keys';

export const Login = user => ({
  type: actionKeys.LOGIN,
  payload: user
});

export const Logout = () => ({
  type: actionKeys.LOGOUT
});
