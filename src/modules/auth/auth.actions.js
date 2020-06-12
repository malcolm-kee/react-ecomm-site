import { extractError } from 'lib/ajax';
import { clear, load, save } from 'lib/storage';
import * as authService from './auth.service';
import { authActions } from './auth.slice';

export const initAuthStatus = () => (dispatch) => {
  const user = load('user');

  dispatch(user ? authActions.login(user) : authActions.logout());
};

export const attemptLogin = (email, password) => (dispatch) => {
  dispatch(authActions.authenticating());

  return authService
    .login({ email, password })
    .then((loginDetails) => {
      return authService
        .getProfile(loginDetails.access_token)
        .then((profile) => ({
          ...profile,
          accessToken: loginDetails.access_token,
        }));
    })
    .then((user) => {
      dispatch(authActions.login(user));
      save('user', user);
    })
    .catch((err) =>
      extractError(err).then((msg) => dispatch(authActions.authError(msg[0])))
    );
};

export const attemptLogout = () => (dispatch) => {
  clear('user');
  dispatch(authActions.logout());
};
