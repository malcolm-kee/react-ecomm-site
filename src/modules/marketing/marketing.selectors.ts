import { RootState } from '../../type';

const selectMarketingStore = (state: RootState) => state.marketing;

export const selectBanners = (state: RootState) =>
  selectMarketingStore(state).banners;

export const selectNoBanner = (state: RootState) =>
  selectBanners(state).length === 0;
