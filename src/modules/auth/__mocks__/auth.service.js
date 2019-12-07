export function register({ name, email }) {
  return login({ email });
}

export function login({ email }) {
  return Promise.resolve({
    name: 'Malcolm Kee',
    email,
    joinedDate: 1555820103947,
    id: 1552750775326,
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
