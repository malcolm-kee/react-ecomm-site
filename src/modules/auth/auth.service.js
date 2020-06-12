import { fetchJson } from 'lib/ajax';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
const REGISTER_URL = process.env.REACT_APP_REGISTER_URL;
const PROFILE_URL = process.env.REACT_APP_PROFILE_URL;

export function register({ name, email, password, avatar }) {
  return fetchJson(REGISTER_URL, {
    method: 'POST',
    data: {
      email,
      name,
      password,
      avatar,
    },
  });
}

export function login({ email, password }) {
  return fetchJson(LOGIN_URL, {
    method: 'POST',
    data: {
      username: email,
      password,
    },
  });
}

export function getProfile(accessToken) {
  return fetchJson(PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
