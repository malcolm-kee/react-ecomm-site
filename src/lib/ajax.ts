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

/**
 * Code inspired by `unfetch`
 */
export const xhrX = (url: string, options: FetchInit = {}) => {
  const xhr = new XMLHttpRequest();
  const keys: string[] = [];
  const all: Array<[string, string]> = [];
  const headers: Record<string, string> = {};
  const rUrl = options.params ? url + stringifyParams(options.params) : url;

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

  xhr.open(options.method || 'get', rUrl, true);

  xhr.withCredentials = options.credentials === 'include';

  if (options.json) {
    xhr.setRequestHeader('Accept', 'application/json');
    if (options.method && options.method.toLowerCase() !== 'get') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
  }

  for (const i in options.headers) {
    xhr.setRequestHeader(i, (options.headers as Record<string, string>)[i]);
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
        xhr.send(
          options.body || (options.data && JSON.stringify(options.data)) || null
        );
      }),
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
