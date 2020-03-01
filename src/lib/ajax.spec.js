import mock from 'xhr-mock';
import { fetchJson } from './ajax';

describe(`fetchJson`, () => {
  let consoleErrorSpy = jest.fn();

  beforeEach(() => {
    mock.setup();
  });

  afterEach(() => {
    mock.teardown();
    consoleErrorSpy.mockRestore();
  });

  it(`makes request for GET as expected`, async () => {
    expect.assertions(3);

    mock.get('/api', (req, res) => {
      expect(req.header('Accept')).toBe('application/json');
      expect(req.header('Content-Type')).toBeNull();
      return res.status(200).body(
        JSON.stringify({
          a: 'b',
        })
      );
    });

    const response = await fetchJson('/api');

    expect(response).toStrictEqual({
      a: 'b',
    });
  });

  it(`makes request for POST as expected`, async () => {
    expect.assertions(4);

    mock.post('/api', (req, res) => {
      expect(req.header('Accept')).toBe('application/json');
      expect(req.header('Content-Type')).toBe('application/json');
      expect(req.body()).toBe(JSON.stringify({ x: 'y' }));
      return res.status(200).body(
        JSON.stringify({
          a: 'b',
        })
      );
    });

    const response = await fetchJson('/api', {
      method: 'POST',
      data: {
        x: 'y',
      },
    });

    expect(response).toStrictEqual({
      a: 'b',
    });
  });

  it(`retries 2 times by default`, async () => {
    consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});
    const cb = jest.fn();

    mock.get('/api', () => {
      cb();
      return Promise.reject(new Error('Network Error'));
    });

    await expect(fetchJson('/api')).rejects.toBeDefined();
    expect(cb).toHaveBeenCalledTimes(3);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
  });
});
