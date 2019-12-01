import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useInterval } from '../../hooks/use-interval';
import { CarouselContextValue } from './carousel-context';

// modulus in JS is different from modules in Maths, thus this
function modulus(number: number, mod: number) {
  return ((number % mod) + mod) % mod;
}

type CarouselState = {
  previousIndex: number | null;
  activeIndex: number;
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    previousIndex: null,
    activeIndex: 0
  } as CarouselState,
  reducers: {
    next: state => {
      state.previousIndex = state.activeIndex;
      state.activeIndex++;
    },
    prev: state => {
      state.previousIndex = state.activeIndex;
      state.activeIndex--;
    },
    override: (state, action: PayloadAction<number>) => {
      state.previousIndex = state.activeIndex;
      state.activeIndex = action.payload;
    }
  }
});

const carouselReducer = carouselSlice.reducer;
const carouselActions = carouselSlice.actions;

function getTransitionDirection(
  newIndex: number,
  previousIndex: number | null,
  totalSlides: number
): 'left' | 'right' {
  const actualIndex = modulus(newIndex, totalSlides);
  const actualOldIndex = previousIndex
    ? modulus(previousIndex, totalSlides)
    : 0;

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

export const useCarouselState = (
  interval: number | null,
  initialSlide: number
): CarouselContextValue => {
  const [{ activeIndex, previousIndex }, dispatch] = React.useReducer(
    carouselReducer,
    {
      previousIndex: null,
      activeIndex: initialSlide
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
  const resetRef = React.useRef<ReturnType<typeof useInterval>>(latestReset);
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
      setActiveIndex: function(newIndex: number) {
        dispatch(carouselActions.override(newIndex));
        resetRef.current();
      },
      pause: () => setIsPause(true),
      unPause: () => setIsPause(false)
    }),
    [activeIndex, previousIndex, setIsPause, totalSlides, setTotalSlides]
  );

  return carouSelContextValue;
};
