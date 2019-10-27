import React from 'react';

function noop() {}

type voidFn = () => void;

export type CarouselContextValue = {
  activeIndex: number;
  setActiveIndex: (newIndex: number) => void;
  totalSlides: number;
  setTotalSlides: (totalSlides: number) => void;
  next: voidFn;
  prev: voidFn;
  pause: voidFn;
  unPause: voidFn;
  direction: 'right' | 'left';
};

export const CarouselContext = React.createContext<CarouselContextValue>({
  activeIndex: 0,
  setActiveIndex: noop,
  totalSlides: 0,
  setTotalSlides: noop,
  next: noop,
  prev: noop,
  pause: noop,
  unPause: noop,
  direction: 'right'
});
