export function register({ name, email }: any) {
  return login({ email });
}

export function login({ email }: any) {
  return Promise.resolve({
    name: 'Malcolm Kee',
    email: email,
    joinedDate: 1555820103947,
    id: 1552750775326,
  });
}
