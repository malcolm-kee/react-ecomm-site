import { save, load, clear } from '../../lib/storage';
import * as actionKeys from './auth.action-keys';
import * as authService from './auth.service';

export const login = user => ({
  type: actionKeys.LOGIN,
  payload: user
});

export const authenticating = () => ({
  type: actionKeys.AUTHENTICATING
});

export const logout = () => ({
  type: actionKeys.LOGOUT
});

export const authError = error => ({
  type: actionKeys.AUTH_ERROR,
  payload: error instanceof Error ? error.message : error
});

export const initAuthStatus = () => dispatch => {
  const user = load('user');

  dispatch(user ? login(user) : logout());
};

export const register = ({ email, name }) => dispatch => {
  dispatch(authenticating());

  return authService
    .register({
      email,
      name
    })
    .then(user => {
      dispatch(login(user));
      save('user', user);
    })
    .catch(err => dispatch(authError(err)));
};

export const attemptLogin = email => dispatch => {
  dispatch(authenticating());

  return authService
    .login({ email })
    .then(user => {
      dispatch(login(user));
      save('user', user);
    })
    .catch(err => dispatch(authError(err)));
};

export const attemptLogout = () => dispatch => {
  clear('user');
  dispatch(logout());
};
