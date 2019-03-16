import React from 'react';

function noop() {}

export const CarouselContext = React.createContext({
  currentSlide: undefined,
  next: noop,
  prev: noop,
  addSlide: noop,
  removeSlide: noop,
  pause: noop,
  unPause: noop
});
