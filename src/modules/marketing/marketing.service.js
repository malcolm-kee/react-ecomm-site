import { xFetchJson } from '../../lib/ajax';

const BANNER_BASE_URL = process.env.REACT_APP_BANNER_BASE_URL;

export function getBanners() {
  return xFetchJson(BANNER_BASE_URL).then((datum) => datum.map((d) => d.data));
}
