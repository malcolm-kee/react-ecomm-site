import { fetchWithRetry } from '../../lib/ajax';

const AUTH_BASE_URL = 'https://ecomm-db.herokuapp.com/users';

export function register({ name, email }) {
  return fetchWithRetry(AUTH_BASE_URL, {
    params: {
      email
    }
  }).then(function checkEmailHasUsed(users) {
    if (users.length === 0) {
      return fetchWithRetry(AUTH_BASE_URL, {
        method: 'POST',
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
  return fetchWithRetry(AUTH_BASE_URL, {
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

export function update({ id, name, email }) {
  return fetchWithRetry(`${AUTH_BASE_URL}/${id}`, {
    method: 'PATCH',
    data: {
      name,
      email
    }
  });
}
