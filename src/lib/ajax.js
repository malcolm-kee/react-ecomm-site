import fetch from 'unfetch';

const DEFAULT_RETRIES = [1000, 3000];

export function fetchWithRetry(
  url,
  { retryDelays = DEFAULT_RETRIES, params, data, ...init } = {}
) {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;
    const requestUrl = url + stringifyParams(params);

    function makeRequest() {
      attemptCount++;
      const request = fetch(
        requestUrl,
        data
          ? {
              ...init,
              body: JSON.stringify(data),
            }
          : init
      );

      request
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
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
        .catch(err => {
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

const hasOwnProperty = Object.prototype.hasOwnProperty;

const stringifyParams = params => {
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

export function fetchJson(url, { headers, ...init } = {}) {
  const additionalHeaders =
    init.method && init.method !== 'GET'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      : {
          Accept: 'application/json',
        };

  return fetchWithRetry(url, {
    headers: {
      ...additionalHeaders,
      ...headers,
    },
    ...init,
  }).then(response => response.json());
}
