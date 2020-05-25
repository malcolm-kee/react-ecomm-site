import * as faker from 'faker';

export function register({ name, email }: any) {
  return login({ email });
}

export function login({ email }: any) {
  return Promise.resolve({
    access_token: faker.random.alphaNumeric(),
  });
}

export function getProfile() {
  return Promise.resolve({
    userId: faker.random.alphaNumeric(),
    email: faker.internet.email(),
    name: faker.internet.userName(),
  });
}
