import cx from 'classnames';
import * as React from 'react';
import { CarouselContext } from './carousel-context';
import styles from './carousel-indicators.module.scss';

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
    unPause,
  } = React.useContext(CarouselContext);
  const indicators = [];

  for (let index = 0; index < totalSlides; index++) {
    const indicator = (
      <li
        className={cx(styles.item, index === activeIndex && styles.active)}
        onClick={() => setActiveIndex(index)}
        data-testid="carousel-indicator"
        key={index}
      />
    );
    indicators.push(indicator);
  }

  return (
    <ol className={styles.root} onMouseEnter={pause} onMouseLeave={unPause}>
      {indicators}
    </ol>
  );
}
