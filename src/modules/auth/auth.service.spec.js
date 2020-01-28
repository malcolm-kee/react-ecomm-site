import { register, login } from './auth.service';
import { fetchJson as fetchJsonMock } from '../../lib/ajax';

jest.mock('../../lib/ajax');

describe(`auth register`, () => {
  test(`register a new user`, async () => {
    fetchJsonMock
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve(mockAuthUser));

    const result = await register({
      name: mockAuthUser.name,
      email: mockAuthUser.email,
    });

    expect(result).toBe(mockAuthUser);
  });

  test(`register a user with email already exists`, async () => {
    fetchJsonMock.mockImplementationOnce(() => Promise.resolve([mockAuthUser]));

    await expect(
      register({
        name: mockAuthUser.name,
        email: mockAuthUser.email,
      })
    ).rejects.toThrowError();
  });
});

describe(`auth login`, () => {
  test(`login success`, async () => {
    fetchJsonMock.mockImplementationOnce(() => Promise.resolve([mockAuthUser]));

    const result = await login({
      email: mockAuthUser.email,
    });

    expect(result).toBe(mockAuthUser);
  });

  test(`login fail`, async () => {
    fetchJsonMock.mockImplementationOnce(() => Promise.resolve([]));

    await expect(
      login({
        email: mockAuthUser.email,
      })
    ).rejects.toThrowError();
  });
});

const mockAuthUser = {
  id: Date.now(),
  name: 'Malcolm Kee',
  email: 'malcolm@kee.com',
  joinDate: Date.now(),
};
