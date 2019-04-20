import React from 'react';
import { CarouselContext } from './carousel-context';

/**
 * `<CarouselIndicators />` should be used within `<Carousel />` components.
 * It will display the dots similar to the number of slides
 */
export function CarouselIndicators() {
  const {
    totalSlides,
    activeIndex,
    setActiveIndex,
    pause,
    unPause
  } = React.useContext(CarouselContext);
  const indicators = [];

  for (let index = 0; index < totalSlides; index++) {
    const indicator = (
      <li
        className={index === activeIndex ? 'active' : undefined}
        onClick={() => setActiveIndex(index)}
        data-testid="carousel-indicator"
        key={index}
      />
    );
    indicators.push(indicator);
  }

  return (
    <ol
      className="carousel-indicators"
      onMouseEnter={pause}
      onMouseLeave={unPause}
    >
      {indicators}
    </ol>
  );
}

export default CarouselIndicators;
