import { SimpleResponse, createRequest } from 'xhfetch';

export class FetchError extends Error {
  response?: SimpleResponse;

  constructor(message: string, response?: SimpleResponse) {
    super(message);
    this.response = response;
  }
}

export type FetchInit = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
  data?: any;
  json?: boolean;
};

type RetryOptions = {
  /** delay in millisecond before retry again. Default to [1000, 3000] (wait 1 sec, then 3 secs) */
  retryDelays?: number[];
};

const DEFAULT_RETRIES = [1000, 3000];
export function fetchWithRetry(
  url: string,
  { retryDelays = DEFAULT_RETRIES, ...init }: FetchInit & RetryOptions = {}
): Promise<SimpleResponse> {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;

    function makeRequest(): void {
      attemptCount++;
      const request = xhrX(url, init).fetch();

      request
        .then(response => {
          if (response.ok) {
            fulfill(response);
          } else if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            const error = new FetchError(
              `fetchWithRetry: No success response after ${attemptCount} retries, give up!`,
              response
            );
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

    function retryRequest(): void {
      const retryDelay = retryDelays[attemptCount];
      window.setTimeout(makeRequest, retryDelay);
    }

    function shouldRetry(attempt: number) {
      return attempt < retryDelays.length;
    }

    makeRequest();
  });
}

export function fetchJson(url: string, options: FetchInit & RetryOptions = {}) {
  return fetchWithRetry(url, {
    json: true,
    ...options,
  }).then(res => res.json());
}

export const xhrX = (url: string, options: FetchInit = {}) => {
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
const stringifyParams = (params: FetchInit['params']): string => {
  if (!params) {
    return '';
  }

  let results: string[] = [];

  for (let key in params) {
    if (hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value) {
        results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return `?${results.join('&')}`;
};
