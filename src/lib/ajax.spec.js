import mock, { delay } from 'xhr-mock';
import { fetchJson, xhrX } from './ajax';

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

describe.only(`xhrX`, () => {
  beforeEach(() => {
    mock.setup();
  });

  afterEach(() => {
    mock.teardown();
  });

  it(`.fetch behaves just like fetch`, async () => {
    expect.assertions(2);
    const result = {
      a: 'b',
    };

    mock.get('/api', (req, res) => {
      expect(req.header('Content-Type')).toBeNull();
      return res.status(200).body(JSON.stringify(result));
    });

    const response = await xhrX('/api')
      .fetch()
      .then(res => res.json());

    expect(response).toStrictEqual(result);
  });

  it(`can be invoked for json`, async () => {
    mock.get('/api', delay({ status: 200 }, 500));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    xhrX('/api', { json: true })
      .fetch()
      .then(onSuccess, onError);

    await new Promise(fulfill => setTimeout(fulfill, 700));

    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it(`can be cancelled`, async () => {
    mock.get('/api', delay({ status: 200 }, 500));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { xhr, fetch } = xhrX('/api');

    fetch().then(onSuccess, onError);

    xhr.abort();

    await new Promise(fulfill => setTimeout(fulfill, 700));

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });
});
