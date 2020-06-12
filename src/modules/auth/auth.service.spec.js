import { fetchJson as fetchJsonMock } from 'lib/ajax';
import { login, register } from './auth.service';

jest.mock('lib/ajax');

describe(`auth register`, () => {
  test(`register a new user`, async () => {
    fetchJsonMock.mockImplementationOnce(() => Promise.resolve(mockAuthUser));

    const result = await register({
      name: mockAuthUser.name,
      email: mockAuthUser.email,
      password: mockAuthUser.password,
    });

    expect(result).toBe(mockAuthUser);
  });

  test(`register a user with email already exists`, async () => {
    fetchJsonMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error'))
    );

    await expect(
      register({
        name: mockAuthUser.name,
        email: mockAuthUser.email,
        password: mockAuthUser.password,
      })
    ).rejects.toThrowError();
  });
});

describe(`auth login`, () => {
  test(`login success`, async () => {
    fetchJsonMock.mockImplementationOnce(() => Promise.resolve(mockAuthUser));

    const result = await login({
      email: mockAuthUser.email,
      password: mockAuthUser.password,
    });

    expect(result).toBe(mockAuthUser);
  });
});

const mockAuthUser = {
  _id: Date.now(),
  name: 'Malcolm Kee',
  email: 'malcolm@kee.com',
  password: '1234567812',
};
