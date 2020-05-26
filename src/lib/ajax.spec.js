import xhrMock from 'xhr-mock';
import { fetchJson, xhrX, extractError } from './ajax';

describe(`fetchJson`, () => {
  let consoleErrorSpy = jest.fn();

  beforeEach(() => {
    xhrMock.setup();
  });

  afterEach(() => {
    xhrMock.teardown();
    consoleErrorSpy.mockRestore();
  });

  it(`makes request for GET as expected`, async () => {
    expect.assertions(3);

    xhrMock.get('/api', (req, res) => {
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

    xhrMock.post('/api', (req, res) => {
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

    xhrMock.get('/api', () => {
      cb();
      return Promise.reject(new Error('Network Error'));
    });

    await expect(fetchJson('/api')).rejects.toBeDefined();
    expect(cb).toHaveBeenCalledTimes(3);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
  });
});

describe(`extractError`, () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  it(`can extract error from messages field`, async () => {
    const errorText = 'Your fault.';

    xhrMock.get(/.*/, {
      status: 400,
      body: JSON.stringify({
        messages: errorText,
      }),
    });

    const error = await xhrX('/somewhere')
      .fetch()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(extractError);
        }
      });

    expect(error).toStrictEqual([errorText]);
  });

  it(`can extract error from messages field`, async () => {
    const errorText = 'Your fault.';

    xhrMock.get(/.*/, {
      status: 400,
      body: JSON.stringify({
        messages: errorText,
      }),
    });

    const error = await xhrX('/somewhere')
      .fetch()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(extractError);
        }
      });

    expect(error).toStrictEqual([errorText]);
  });

  it(`can fall backs to Unknown Error when cannot parse the text`, async () => {
    xhrMock.get(/.*/, {
      status: 500,
      body: null,
    });

    const error = await fetchJson('/somewhere', { retryDelays: [] }).catch(
      extractError
    );

    expect(error).toMatchInlineSnapshot(`
      Array [
        "Unknown Error",
      ]
    `);
  });
});
