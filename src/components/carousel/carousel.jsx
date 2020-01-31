import PropTypes from 'prop-types';
import React from 'react';
import { CarouselContext } from './carousel-context';
import { useCarouselState } from './carousel-state';

export const Carousel = ({ interval = null, initialSlide = 0, children }) => {
  const value = useCarouselState(interval, initialSlide);

  return (
    <CarouselContext.Provider value={value}>
      <div className="carousel slide relative">{children}</div>
    </CarouselContext.Provider>
  );
};

Carousel.propTypes = {
  /**
   * Number of miliseconds to wait before auto-transition to next slide.
   * If not provided, Carousel will not auto-transition
   */
  interval: PropTypes.number,
  initialSlide: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
