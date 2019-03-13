import { ajax } from '../../lib/ajax';

const AUTH_BASE_URL = 'https://ecomm-db.herokuapp.com/users';

export function register({ name, email }) {
  return ajax({
    url: AUTH_BASE_URL,
    params: {
      email
    }
  }).then(function checkEmailHasUsed(users) {
    if (users.length === 0) {
      return ajax({
        method: 'POST',
        url: AUTH_BASE_URL,
        data: {
          name,
          email,
          joinedDate: Date.now()
        }
      });
    }

    throw new Error('Email already used');
  });
}

export function login({ email }) {
  return ajax({
    url: AUTH_BASE_URL,
    params: {
      email
    }
  }).then(function checkUser(users) {
    if (users.length === 1) {
      return users[0];
    }
    throw new Error('Invalid user');
  });
}
