import { fetchJson } from '../../lib/ajax';
import { MarketingBanner } from './marketing.type';

const BANNER_BASE_URL = 'https://ecomm-db.herokuapp.com/banners';

export function getBanners(): Promise<MarketingBanner[]> {
  return fetchJson(BANNER_BASE_URL);
}
