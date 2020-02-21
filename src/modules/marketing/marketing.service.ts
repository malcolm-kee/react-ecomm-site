import { fetchJson } from '../../lib/ajax';
import { MarketingBanner } from './marketing.type';

const BANNER_BASE_URL = process.env.REACT_APP_BANNER_BASE_URL as string;

export function getBanners(): Promise<MarketingBanner[]> {
  return fetchJson(BANNER_BASE_URL);
}
