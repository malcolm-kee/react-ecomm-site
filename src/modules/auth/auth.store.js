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
    this.setupSyncStorage();
  }

  init() {
    this.user = load('user');
  }

  setupSyncStorage() {
    reaction(
      () => this.user,
      user => {
        if (user) {
          save('user', user);
        } else {
          clear('user');
        }
        this.pending = false;
      }
    );
  }

  updateUser = user => {
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

  login = async email => {
    this.pending = true;
    try {
      const user = await authService.login({ email });
      this.updateUser(user);
    } catch (e) {
      this.handleError(e);
    }
  };

  updateProfile = async user => {
    this.pending = true;
    try {
      const updatedUser = await authService.update(user);
      this.updateUser(updatedUser);
    } catch (e) {
      this.handleError(e);
    }
  };

  handleError = error => {
    this.error = error instanceof Error ? error.message : error;
    this.pending = false;
  };

  logout = () => {
    this.user = null;
  };
}

decorate(AuthStore, {
  pending: observable,
  user: observable.shallow,
  isAuthenticated: computed,
  error: observable,
  init: action,
  updateUser: action,
  register: action,
  login: action,
  updateProfile: action,
  handleError: action,
  logout: action,
});
