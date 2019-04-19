import {
  action,
  computed,
  decorate,
  observable,
  reaction,
  runInAction
} from 'mobx';
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

  register = async ({ email, name }) => {
    this.pending = true;
    try {
      const user = await authService.register({ name, email });
      runInAction(() => (this.user = user));
    } catch (e) {
      this.handleError(e);
    }
  };

  login = async email => {
    this.pending = true;
    try {
      const user = await authService.login({ email });
      runInAction(() => (this.user = user));
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
  register: action,
  login: action,
  handleError: action,
  logout: action
});
