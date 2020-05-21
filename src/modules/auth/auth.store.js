import { action, computed, decorate, observable, reaction } from 'mobx';
import { clear, load, save } from '../../lib/storage';
import * as authService from './auth.service';

/**
 * Authentication MobX store
 */
export class AuthStore {
  pending = false;
  user = null;
  error = '';

  get isAuthenticated() {
    return !this.pending && this.user !== null;
  }

  constructor() {
    this.user = load('user');
    this.setupSyncStorage();
  }

  setupSyncStorage() {
    reaction(
      () => this.user,
      (user) => {
        if (user) {
          save('user', user);
        } else {
          clear('user');
        }
        this.pending = false;
      }
    );
  }

  updateUser = (user) => {
    this.user = user;
    this.error = '';
  };

  register = async ({ email, name }) => {
    this.pending = true;
    try {
      const user = await authService.register({ name, email });
      this.updateUser(user);
    } catch (e) {
      this.handleError(e);
    }
  };

  login = async (email) => {
    this.pending = true;
    try {
      const user = await authService.login({ email });
      this.updateUser(user);
    } catch (e) {
      this.handleError(e);
    }
  };

  updateProfile = async (user) => {
    this.pending = true;
    try {
      const updatedUser = await authService.update(user);
      this.updateUser(updatedUser);
    } catch (e) {
      this.handleError(e);
    }
  };

  setError = (errorMsg) => {
    this.error = errorMsg;
    this.pending = false;
  };

  handleError = (error) =>
    extractErrorMessage(error).then((errorMsg) => this.setError(errorMsg));

  logout = () => {
    this.user = null;
  };
}

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

decorate(AuthStore, {
  pending: observable,
  user: observable.shallow,
  isAuthenticated: computed,
  error: observable,
  updateUser: action,
  register: action,
  login: action,
  updateProfile: action,
  setError: action,
  logout: action,
});
