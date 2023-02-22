import { useQuery } from '@tanstack/react-query';
import { getBanners } from './marketing.service';

export function useMarketingBanner() {
  return useQuery(['banners'], () => getBanners(), {
    staleTime: Infinity,
  });
}
