import React from 'react';
import { useId } from '../../hooks/use-id';
import { CarouselContext } from './carousel-context';

export const Slide = ({ children }) => {
  const slideId = useId();
  const {
    currentSlide,
    addSlide,
    removeSlide,
    pause,
    unPause
  } = React.useContext(CarouselContext);

  React.useEffect(() => {
    if (slideId) {
      addSlide(slideId);
    }

    return () => slideId && removeSlide(slideId);
  }, [slideId, addSlide, removeSlide]);

  return currentSlide === slideId ? (
    <div className="slide" onMouseEnter={pause} onMouseLeave={unPause}>
      {children}
    </div>
  ) : null;
};

export default Slide;
