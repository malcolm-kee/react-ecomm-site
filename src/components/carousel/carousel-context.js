import React from 'react';

function noop() {}

export const CarouselContext = React.createContext({
  activeIndex: 0,
  setActiveIndex: noop,
  totalSlides: 0,
  setTotalSlides: noop,
  next: noop,
  prev: noop,
  pause: noop,
  unPause: noop
});
