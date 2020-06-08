import { fetchJson } from 'lib/ajax';
import { AuthUser } from './auth.type';

const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL as string;
const PROFILE_URL = process.env.NEXT_PUBLIC_PROFILE_URL as string;

export function register(details: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}): Promise<AuthUser> {
  return fetchJson(REGISTER_URL, {
    method: 'POST',
    data: details,
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

export function getProfile(
  accessToken: string
): Promise<{
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
