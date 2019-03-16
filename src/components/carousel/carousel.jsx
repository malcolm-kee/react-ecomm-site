import PropTypes from 'prop-types';
import React from 'react';
import { CarouselContext } from './carousel-context';
import { useCarouselState } from './carousel-state';

export const Carousel = ({ interval = 2500, initialSlide = 0, children }) => {
  const value = useCarouselState(interval, initialSlide);

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

Carousel.propTypes = {
  interval: PropTypes.number,
  initialSlide: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Carousel;
