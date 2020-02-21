import { fetchJson } from '../../lib/ajax';
import { AuthUser } from './auth.type';

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL as string;

export function register({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<AuthUser> {
  return fetchJson(AUTH_BASE_URL, {
    params: {
      email,
    },
  }).then(function checkEmailHasUsed(users) {
    if (users.length === 0) {
      return fetchJson(AUTH_BASE_URL, {
        method: 'POST',
        data: {
          name,
          email,
          joinedDate: Date.now(),
        },
      });
    }

    throw new Error('Email already used');
  });
}

export function login({ email }: { email: string }): Promise<AuthUser> {
  return fetchJson(AUTH_BASE_URL, {
    params: {
      email,
    },
  }).then(function checkUser(users) {
    if (users.length === 1) {
      return users[0];
    }
    throw new Error('Invalid user');
  });
}
