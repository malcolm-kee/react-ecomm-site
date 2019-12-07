import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE = {
  banners: [],
};

const marketingSlice = createSlice({
  name: 'marketing',
  initialState: DEFAULT_STATE,
  reducers: {
    setBanners: (state, { payload }) => {
      state.banners = payload;
    },
  },
});

export const marketingReducer = marketingSlice.reducer;

export const marketingActions = marketingSlice.actions;
