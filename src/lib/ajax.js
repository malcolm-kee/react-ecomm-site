import { createRequest } from 'xhfetch';

const DEFAULT_RETRIES = [1000, 3000];

export function fetchWithRetry(
  url,
  { retryDelays = DEFAULT_RETRIES, ...init } = {}
) {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;

    function makeRequest() {
      attemptCount++;
      const request = xhrX(url, init).fetch();

      request
        .then((response) => {
          if (response.ok) {
            fulfill(response);
          } else if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            const error = new Error(
              `fetchWithRetry: No success response after ${attemptCount} retries, give up!`
            );
            error.response = response;
            reject(error);
          }
        })
        .catch((err) => {
          if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            reject(err);
          }
        });
    }

    function retryRequest() {
      const retryDelay = retryDelays[attemptCount];
      window.setTimeout(makeRequest, retryDelay);
    }

    function shouldRetry(attempt) {
      return attempt < retryDelays.length;
    }

    makeRequest();
  });
}

export function fetchJson(url, options = {}) {
  return fetchWithRetry(url, {
    json: true,
    ...options,
  }).then((res) => res.json());
}

export const xhrX = (url, options = {}) => {
  const rUrl = url + stringifyParams(options.params);

  const { xhr, fetch } = createRequest(rUrl, {
    ...options,
    body: options.data ? JSON.stringify(options.data) : options.body,
    headers: options.json
      ? {
          Accept: 'application/json',
          ...(options.method && options.method.toLowerCase() !== 'get'
            ? {
                'Content-Type': 'application/json',
              }
            : {}),
          ...options.headers,
        }
      : options.headers,
  });

  return {
    xhr,
    fetch,
  };
};

const hasOwnProperty = Object.prototype.hasOwnProperty;
const stringifyParams = (params) => {
  if (!params) {
    return '';
  }

  let results = [];

  for (let key in params) {
    if (hasOwnProperty.call(params, key)) {
      results.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }

  return `?${results.join('&')}`;
};

export function xFetchJson(url, options) {
  const { xhr, fetch } = xhrX(url, {
    json: true,
    ...options,
  });

  const response = fetch().then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });

  response.cancel = () => xhr.abort();

  return response;
}

export function extractError(err) {
  const getErrorText = () => {
    if (err) {
      if (typeof err === 'string') {
        return [err];
      }
      const msgField = err.message || err.messages;
      if (msgField) {
        if (Array.isArray(msgField)) {
          return msgField;
        }

        if (typeof msgField === 'string') {
          return [msgField];
        }
      }
    }

    return ['Unknown Error'];
  };

  return err.response
    ? Promise.resolve()
        .then(() => err.response.json())
        .catch(() => err.response.text())
        .then(extractError)
    : Promise.resolve(getErrorText());
}
