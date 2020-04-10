const DEFAULT_RETRIES = [1000, 3000];

export type SimpleResponse = {
  ok: boolean;
  statusText: string;
  status: number;
  url: string;
  text: () => Promise<string>;
  json: () => Promise<any>;
  blob: () => Promise<Blob>;
  clone: () => SimpleResponse;
  headers: {
    keys: () => string[];
    entries: () => Array<[string, string]>;
    get: (name: string) => string;
    has: (name: string) => boolean;
  };
};

export class FetchError extends Error {
  response?: SimpleResponse;

  constructor(message: string, response?: SimpleResponse) {
    super(message);
    this.response = response;
  }
}

type FetchInit = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
  data?: any;
  /** delay in millisecond before retry again. Default to [1000, 3000] (wait 1 sec, then 3 secs) */
  retryDelays?: number[];
};

export function fetchWithRetry(
  url: string,
  { retryDelays = DEFAULT_RETRIES, params, data, ...init }: FetchInit = {}
): Promise<SimpleResponse> {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;
    const requestUrl = url + stringifyParams(params);

    function makeRequest(): void {
      attemptCount++;
      const request = xhrX(
        requestUrl,
        data
          ? {
              ...init,
              body: JSON.stringify(data),
            }
          : init
      ).fetch();

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

const getHeadersForJsonRequest = ({ headers, method }: FetchInit = {}) => {
  const result: Record<string, string> =
    method && method.toLowerCase() !== 'get'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      : {
          Accept: 'application/json',
        };

  for (const key in headers) {
    const value = (headers as Record<string, string>)[key];
    result[key] = value;
  }

  return result;
};

export function fetchJson(url: string, options: FetchInit = {}) {
  return fetchWithRetry(url, {
    ...options,
    headers: getHeadersForJsonRequest(options),
  }).then(res => res.json());
}

/**
 * Code inspired by `unfetch`
 */
export const xhrX = (
  url: string,
  options: FetchInit & { json?: boolean } = {}
) => {
  const xhr = new XMLHttpRequest();
  const keys: string[] = [];
  const all: Array<[string, string]> = [];
  const headers: Record<string, string> = {};

  const response = (): SimpleResponse => ({
    // eslint-disable-next-line
    ok: ((xhr.status / 100) | 0) == 2, // 200-299
    statusText: xhr.statusText,
    status: xhr.status,
    url: xhr.responseURL,
    text: () => Promise.resolve(xhr.responseText),
    json: () => Promise.resolve(JSON.parse(xhr.responseText)),
    blob: () => Promise.resolve(new Blob([xhr.response])),
    clone: response,
    headers: {
      keys: () => keys,
      entries: () => all,
      get: (name: string) => headers[name.toLowerCase()],
      has: (name: string) => name.toLowerCase() in headers,
    },
  });

  xhr.open(options.method || 'get', url, true);

  xhr.withCredentials = options.credentials === 'include';

  const requestHeaders = options.json
    ? getHeadersForJsonRequest(options)
    : options.headers;

  for (const i in requestHeaders) {
    xhr.setRequestHeader(i, (requestHeaders as Record<string, string>)[i]);
  }

  return {
    xhr,
    fetch: () =>
      new Promise<SimpleResponse>((fulfill, reject) => {
        xhr.onload = () => {
          xhr.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, ((
            _: string,
            key: string,
            value: string
          ) => {
            keys.push((key = key.toLowerCase()));
            all.push([key, value]);
            headers[key] = headers[key] ? `${headers[key]},${value}` : value;
          }) as any);
          fulfill(response());
        };

        xhr.onerror = reject;
        xhr.send(options.body || null);
      }),
  };
};
