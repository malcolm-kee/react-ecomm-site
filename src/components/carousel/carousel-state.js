import React from 'react';
import { useInterval } from '../../hooks/use-interval';

const initState = initialSlide => ({
  currentSlide: initialSlide,
  slides: []
});

const carouselReducer = (state, action) => {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        currentSlide:
          state.currentSlide && state.currentSlide === state.slides.length - 1
            ? 0
            : state.currentSlide + 1
      };

    case 'prev':
      return {
        ...state,
        currentSlide:
          state.currentSlide && state.currentSlide !== 0
            ? state.currentSlide - 1
            : state.slides.length - 1
      };

    case 'addSlide':
      return {
        ...state,
        slides: state.slides.concat(action.payload)
      };

    case 'removeSlide':
      return {
        ...state,
        slides: state.slides.filter(slideId => slideId === action.payload)
      };

    default:
      throw new Error('unexpected action in carouselReducer');
  }
};

export const useCarouselState = (interval, initialSlide) => {
  const [state, dispatch] = React.useReducer(
    carouselReducer,
    initialSlide,
    initState
  );
  const [isPause, setIsPause] = React.useState(false);

  const dispatchNext = React.useCallback(() => {
    dispatch({ type: 'next' });
  }, [dispatch]);

  const reset = useInterval(
    () => {
      dispatchNext();
    },
    isPause ? null : interval
  );

  const next = React.useCallback(() => {
    dispatchNext();
    reset();
  }, [dispatchNext, reset]);

  const prev = React.useCallback(() => dispatch({ type: 'prev' }), [dispatch]);

  const addSlide = React.useCallback(
    slideId =>
      dispatch({
        type: 'addSlide',
        payload: slideId
      }),
    [dispatch]
  );

  const removeSlide = React.useCallback(
    slideId => dispatch({ type: 'removeSlide', payload: slideId }),
    [dispatch]
  );

  const pause = React.useCallback(() => setIsPause(true), [setIsPause]);
  const unPause = React.useCallback(() => setIsPause(false), [setIsPause]);

  const carouSelContextValue = React.useMemo(
    () => ({
      next,
      prev,
      addSlide,
      removeSlide,
      currentSlide: state.slides[state.currentSlide],
      pause,
      unPause
    }),
    [
      state.slides,
      state.currentSlide,
      next,
      prev,
      dispatch,
      setIsPause,
      addSlide,
      removeSlide,
      pause,
      unPause
    ]
  );

  return carouSelContextValue;
};
