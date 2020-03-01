import { clear, load, save } from '../../lib/storage';
import * as authService from './auth.service';
import { authActions } from './auth.slice';

export const initAuthStatus = () => dispatch => {
  const user = load('user');

  dispatch(user ? authActions.login(user) : authActions.logout());
};

export const register = ({ email, name }) => dispatch => {
  dispatch(authActions.authenticating());

  return authService
    .register({
      email,
      name,
    })
    .then(user => {
      dispatch(authActions.login(user));
      save('user', user);
    })
    .catch(err =>
      extractErrorMessage(err).then(msg => dispatch(authActions.authError(msg)))
    );
};

export const attemptLogin = email => dispatch => {
  dispatch(authActions.authenticating());

  return authService
    .login({ email })
    .then(user => {
      dispatch(authActions.login(user));
      save('user', user);
    })
    .catch(err =>
      extractErrorMessage(err).then(msg => dispatch(authActions.authError(msg)))
    );
};

export const attemptLogout = () => dispatch => {
  clear('user');
  dispatch(authActions.logout());
};

function extractErrorMessage(err) {
  return err.response
    ? Promise.resolve()
        .then(() => err.response.json())
        .catch(() => err.response.text())
        .then(extractErrorMessage)
    : Promise.resolve(
        err.message
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Unknown Error'
      );
}
