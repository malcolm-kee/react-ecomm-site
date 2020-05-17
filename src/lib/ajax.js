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
