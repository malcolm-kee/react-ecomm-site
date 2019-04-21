import React from 'react';
import { useInterval } from '../../hooks/use-interval';

// modulus in JS is different from modules in Maths, thus this
function modulus(number, mod) {
  return ((number % mod) + mod) % mod;
}

function carouselReducer(state, action) {
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
  next: () => ({ type: 'next' }),
  prev: () => ({ type: 'prev' }),
  override: newIndex => ({ type: 'override', payload: newIndex })
};

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
      activeIndex: initialSlide
    }
  );
  const [totalSlides, setTotalSlides] = React.useState(0);
  const [isPause, setIsPause] = React.useState(false);

  const reset = useInterval(
    () => {
      dispatch(carouselActions.next());
    },
    isPause ? null : interval
  );

  const carouSelContextValue = React.useMemo(
    () => ({
      next: () => {
        dispatch(carouselActions.next());
        reset();
      },
      prev: () => {
        dispatch(carouselActions.prev());
        reset();
      },
      totalSlides,
      setTotalSlides,
      activeIndex: modulus(activeIndex, totalSlides),
      direction: getTransitionDirection(
        activeIndex,
        previousIndex,
        totalSlides
      ),
      setActiveIndex: function(newIndex) {
        dispatch(carouselActions.override(newIndex));
        reset();
      },
      pause: () => setIsPause(true),
      unPause: () => setIsPause(false)
    }),
    [activeIndex, previousIndex, setIsPause, totalSlides, setTotalSlides]
  );

  return carouSelContextValue;
};
