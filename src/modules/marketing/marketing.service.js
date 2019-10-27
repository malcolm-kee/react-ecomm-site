import { fetchWithRetry } from '../../lib/ajax';

const BANNER_BASE_URL = 'https://ecomm-db.herokuapp.com/banners';

export function getBanners() {
  return fetchWithRetry(BANNER_BASE_URL);
}
