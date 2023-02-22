import * as React from 'react';
import { CarouselContext } from './carousel-context';

export type SlidesProps = {
  children: React.ReactNode;
};

/**
 * `<Slides />` is the component that wrap around `<Slide />`.
 *
 * `<Slides />` must be used within `<Carousel />` component.
 */
export function Slides({ children }: SlidesProps) {
  const { activeIndex, direction, setTotalSlides, pause, unPause } =
    React.useContext(CarouselContext);

  const totalSlides = React.Children.count(children);

  React.useEffect(() => {
    setTotalSlides(totalSlides);
  }, [totalSlides, setTotalSlides]);

  return (
    <div
      className="carousel-inner relative w-full overflow-hidden"
      role="listbox"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          pause,
          unPause,
          direction,
          isActive: index === activeIndex,
          'data-testid': `slide-${index}`,
        } as any);
      })}
    </div>
  );
}
