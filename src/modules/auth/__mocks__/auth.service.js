export function register({ name, email }) {
  return login({ email });
}

export function login({ email }) {
  return Promise.resolve({
    access_token: '12345789',
  });
}

export function getProfile() {
  return Promise.resolve({
    userId: '12349abc',
    email: 'mk@test.com',
    name: 'Malcolm Kee',
  });
}

export function update({ id, name, email }) {
  return Promise.resolve({
    id,
    name,
    email,
    joinedDate: 1555820103947,
  });
}
