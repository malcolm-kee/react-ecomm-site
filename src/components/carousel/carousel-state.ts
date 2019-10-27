import React from 'react';
import { useInterval } from '../../hooks/use-interval';
import { ValueOf } from '../type';
import { CarouselContextValue } from './carousel-context';

// modulus in JS is different from modules in Maths, thus this
function modulus(number: number, mod: number) {
  return ((number % mod) + mod) % mod;
}

type CarouselState = {
  previousIndex: number | null;
  activeIndex: number;
};

function carouselReducer(
  state: CarouselState,
  action: ReturnType<ValueOf<typeof carouselActions>>
): CarouselState {
  switch (action.type) {
    case 'next':
      return {
        previousIndex: state.activeIndex,
        activeIndex: state.activeIndex + 1
      };

    case 'prev':
      return {
        previousIndex: state.activeIndex,
        activeIndex: state.activeIndex - 1
      };

    case 'override':
      return {
        previousIndex: state.activeIndex,
        activeIndex: action.payload
      };

    default:
      throw new Error('Invalid action type in for carouselState');
  }
}

const carouselActions = {
  next: () => ({ type: 'next' } as const),
  prev: () => ({ type: 'prev' } as const),
  override: (newIndex: number) =>
    ({ type: 'override', payload: newIndex } as const)
};

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
