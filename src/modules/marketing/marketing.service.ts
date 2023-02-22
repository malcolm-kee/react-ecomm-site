import { xFetchJson } from 'lib/ajax';
import { MarketingBanner, MarketingData } from './marketing.type';

const BANNER_BASE_URL = import.meta.env.VITE_BANNER_BASE_URL as string;

export function getBanners(): Promise<MarketingBanner[]> {
  return xFetchJson(BANNER_BASE_URL).then((datum) =>
    datum.map((d: MarketingData<MarketingBanner>) => d.data)
  );
}
