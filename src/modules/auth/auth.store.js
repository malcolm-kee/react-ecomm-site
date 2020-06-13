import { extractError } from 'lib/ajax';
import { clear, load, save } from 'lib/storage';
import { action, computed, decorate, observable, reaction } from 'mobx';
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

  login = async (email, password) => {
    this.pending = true;
    try {
      const loginDetails = await authService.login({ email, password });
      const profile = await authService.getProfile(loginDetails.access_token);
      this.updateUser({
        ...profile,
        accessToken: loginDetails.access_token,
      });
    } catch (e) {
      this.handleError(e);
    }
  };

  setError = (errorMsg) => {
    this.error = errorMsg;
    this.pending = false;
  };

  handleError = (error) =>
    extractError(error).then((errorMsg) => this.setError(errorMsg[0]));

  logout = () => {
    this.user = null;
  };
}

decorate(AuthStore, {
  pending: observable,
  user: observable.shallow,
  isAuthenticated: computed,
  error: observable,
  updateUser: action,
  register: action,
  login: action,
  setError: action,
  logout: action,
});
