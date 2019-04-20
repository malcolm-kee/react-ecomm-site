import React from 'react';
import { useInterval } from '../../hooks/use-interval';

// modulus in JS is different from modules in Maths, thus this
function modulus(number, mod) {
  return ((number % mod) + mod) % mod;
}

export const useCarouselState = (interval, initialSlide = 0) => {
  const [activeIndex, setActiveIndex] = React.useState(initialSlide);
  const [totalSlides, setTotalSlides] = React.useState(0);

  const [isPause, setIsPause] = React.useState(false);

  function nextSlide() {
    setActiveIndex(currentIndex => currentIndex + 1);
  }

  function prevSlide() {
    setActiveIndex(currentIndex => currentIndex - 1);
  }

  const reset = useInterval(
    () => {
      nextSlide();
    },
    isPause ? null : interval
  );

  const next = React.useCallback(() => {
    nextSlide();
    reset();
  }, []);

  const prev = React.useCallback(() => {
    prevSlide();
    reset();
  }, []);

  const pause = React.useCallback(() => setIsPause(true), []);
  const unPause = React.useCallback(() => setIsPause(false), []);

  const carouSelContextValue = React.useMemo(
    () => ({
      next,
      prev,
      totalSlides,
      setTotalSlides,
      activeIndex: modulus(activeIndex, totalSlides),
      setActiveIndex: function(newIndex) {
        setActiveIndex(newIndex);
        reset();
      },
      pause,
      unPause
    }),
    [
      activeIndex,
      next,
      prev,
      setIsPause,
      pause,
      unPause,
      totalSlides,
      setTotalSlides
    ]
  );

  return carouSelContextValue;
};
