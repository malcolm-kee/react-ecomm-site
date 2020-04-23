import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useInterval } from '../../hooks/use-interval';

// modulus in JS is different from modules in Maths, thus this
function modulus(number, mod) {
  return ((number % mod) + mod) % mod;
}

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    previousIndex: null,
    activeIndex: 0,
  },
  reducers: {
    next: (state) => {
      state.previousIndex = state.activeIndex;
      state.activeIndex++;
    },
    prev: (state) => {
      state.previousIndex = state.activeIndex;
      state.activeIndex--;
    },
    override: (state, { payload }) => {
      state.previousIndex = state.activeIndex;
      state.activeIndex = payload;
    },
  },
});

const carouselActions = carouselSlice.actions;
const carouselReducer = carouselSlice.reducer;

function getTransitionDirection(newIndex, previousIndex, totalSlides) {
  const actualIndex = modulus(newIndex, totalSlides);
  const actualOldIndex = modulus(previousIndex, totalSlides);

  if (totalSlides === 0 || previousIndex === null) {
    return 'right';
  }

  if (actualIndex === totalSlides - 1 && actualOldIndex === 0) {
    return 'left';
  }
  if (actualIndex === 0 && actualOldIndex === totalSlides - 1) {
    return 'right';
  }
  return actualIndex > actualOldIndex ? 'right' : 'left';
}

export const useCarouselState = (interval, initialSlide) => {
  const [{ activeIndex, previousIndex }, dispatch] = React.useReducer(
    carouselReducer,
    {
      previousIndex: null,
      activeIndex: initialSlide,
    }
  );
  const [totalSlides, setTotalSlides] = React.useState(0);
  const [isPause, setIsPause] = React.useState(false);

  const latestReset = useInterval(
    () => {
      dispatch(carouselActions.next());
    },
    isPause ? null : interval
  );
  const resetRef = React.useRef(null);
  resetRef.current = latestReset;

  const carouSelContextValue = React.useMemo(
    () => ({
      next: () => {
        dispatch(carouselActions.next());
        resetRef.current();
      },
      prev: () => {
        dispatch(carouselActions.prev());
        resetRef.current();
      },
      totalSlides,
      setTotalSlides,
      activeIndex: modulus(activeIndex, totalSlides),
      direction: getTransitionDirection(
        activeIndex,
        previousIndex,
        totalSlides
      ),
      setActiveIndex: function (newIndex) {
        dispatch(carouselActions.override(newIndex));
        resetRef.current();
      },
      pause: () => setIsPause(true),
      unPause: () => setIsPause(false),
    }),
    [activeIndex, previousIndex, setIsPause, totalSlides, setTotalSlides]
  );

  return carouSelContextValue;
};
