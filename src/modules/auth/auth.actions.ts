import { clear, load, save } from '../../lib/storage';
import { ThunkAction } from '../../type';
import * as authService from './auth.service';
import { authActions } from './auth.slice';
import { AuthUser } from './auth.type';

export const initAuthStatus = (): ThunkAction<void> => dispatch => {
  const user = load('user');

  dispatch(user ? authActions.login(user as AuthUser) : authActions.logout());
};

export const register = ({
  email,
  name
}: {
  email: string;
  name: string;
}): ThunkAction<void> => dispatch => {
  dispatch(authActions.authenticating());

  return authService
    .register({
      email,
      name
    })
    .then(user => {
      dispatch(authActions.login(user));
      save('user', user);
    })
    .catch(err => dispatch(authActions.authError(err)));
};

export const attemptLogin = (email: string): ThunkAction<void> => dispatch => {
  dispatch(authActions.authenticating());

  return authService
    .login({ email })
    .then(user => {
      dispatch(authActions.login(user));
      save('user', user);
    })
    .catch(err => dispatch(authActions.authError(err)));
};

export const attemptLogout = (): ThunkAction<void> => dispatch => {
  clear('user');
  dispatch(authActions.logout());
};
