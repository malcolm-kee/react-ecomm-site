export function register({ name, email }) {
  return login({ email });
}

export function login({ email }) {
  return Promise.resolve({
    name: 'Malcolm Kee',
    email: email,
    joinedDate: 1555820103947,
    id: 1552750775326,
  });
}
