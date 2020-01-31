import React from 'react';
import { CarouselContext } from './carousel-context';
import { useCarouselState } from './carousel-state';

export type CarouselProps = {
  children: React.ReactNode;
  /**
   * Number of miliseconds to wait before auto-transition to next slide.
   * If not provided, Carousel will not auto-transition
   */
  interval?: number | null;
  initialSlide?: number;
};

export const Carousel = ({
  interval = null,
  initialSlide = 0,
  children,
}: CarouselProps) => {
  const value = useCarouselState(interval, initialSlide);

  return (
    <CarouselContext.Provider value={value}>
      <div className="carousel slide relative">{children}</div>
    </CarouselContext.Provider>
  );
};
