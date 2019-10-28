import { createSlice, PayloadAction } from 'redux-starter-kit';
import { MarketingBanner, MarketingState } from './marketing.type';

const DEFAULT_STATE: MarketingState = {
  banners: []
};

const marketingSlice = createSlice({
  name: 'marketing',
  initialState: DEFAULT_STATE,
  reducers: {
    setBanners: (state, { payload }: PayloadAction<MarketingBanner[]>) => {
      state.banners = payload;
    }
  }
});

export const marketingReducer = marketingSlice.reducer;

export const marketingActions = marketingSlice.actions;
