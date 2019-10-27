import { fetchJson } from '../../lib/ajax';

const BANNER_BASE_URL = 'https://ecomm-db.herokuapp.com/banners';

export function getBanners() {
  return fetchJson(BANNER_BASE_URL);
}
