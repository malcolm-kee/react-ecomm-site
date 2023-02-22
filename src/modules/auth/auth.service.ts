import { fetchJson } from 'lib/ajax';

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL as string;
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL as string;
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL as string;

export function register({
  name,
  email,
  password,
  avatar,
}: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}): Promise<void> {
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

export function login(data: {
  email: string;
  password: string;
}): Promise<{ access_token: string }> {
  return fetchJson(LOGIN_URL, {
    method: 'POST',
    data: {
      username: data.email,
      password: data.password,
    },
  });
}

export function getProfile(accessToken: string): Promise<{
  userId: string;
  email: string;
  name: string;
}> {
  return fetchJson(PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
