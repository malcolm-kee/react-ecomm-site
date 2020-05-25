import { extractError } from 'lib/ajax';
import { clear, load, save } from 'lib/storage';
import { ThunkAction } from 'type';
import * as authService from './auth.service';
import { authActions } from './auth.slice';
import { AuthUser } from './auth.type';

export const initAuthStatus = (): ThunkAction<void> => (dispatch) => {
  const user = load('user');

  dispatch(user ? authActions.login(user as AuthUser) : authActions.logout());
};

export const attemptLogin = (
  email: string,
  password: string
): ThunkAction<void> => (dispatch) => {
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

export const attemptLogout = (): ThunkAction<void> => (dispatch) => {
  clear('user');
  dispatch(authActions.logout());
};
