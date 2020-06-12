import { xFetchJson } from 'lib/ajax';

const BANNER_BASE_URL = process.env.REACT_APP_BANNER_BASE_URL;

export function getBanners() {
  const request = xFetchJson(BANNER_BASE_URL);

  const result = request.then((datum) => datum.map((d) => d.data));
  result.cancel = request.cancel;

  return result;
}
