const selectMarketingStore = (state) => state.marketing;

export const selectBanners = (state) => selectMarketingStore(state).banners;

export const selectNoBanner = (state) => selectBanners(state).length === 0;
