const DEFAULT_RETRIES = [1000, 3000];

type FetchInit = RequestInit & {
  params?: Record<string, string | number | boolean>;
  /**
   * state if the response is JSON. When `false`, the `Response` object will be returned.
   *
   * @default true
   *
   **/
  isJson?: boolean;
  data?: any;
  /** delay in millisecond before retry again. Default to [1000, 3000] (wait 1 sec, then 3 secs) */
  retryDelays?: number[];
};

export function fetchWithRetry(
  url: string,
  {
    retryDelays = DEFAULT_RETRIES,
    params,
    isJson = true,
    data,
    ...init
  }: FetchInit = {}
) {
  return new Promise((fulfill, reject) => {
    let attemptCount = -1;
    const requestUrl = url + stringifyParams(params);

    function makeRequest(): void {
      attemptCount++;
      const request = fetch(
        requestUrl,
        data
          ? {
              ...init,
              body: JSON.stringify(data)
            }
          : init
      );

      request
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            fulfill(isJson ? res.json() : res);
          } else if (shouldRetry(attemptCount)) {
            retryRequest();
          } else {
            const error: any = new Error(
              `fetchWithRetry: No success response after ${attemptCount} retries, give up!`
            );
            error.response = res;
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
      return attempt <= retryDelays.length;
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
      results.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }

  return `?${results.join('&')}`;
};
