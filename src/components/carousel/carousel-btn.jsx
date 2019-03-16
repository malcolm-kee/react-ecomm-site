import React from 'react';
import { CarouselContext } from './carousel-context';

export const CarouselBtn = ({ direction = 'next' }) => {
  const { next, prev } = React.useContext(CarouselContext);

  return (
    <button onClick={direction === 'next' ? next : prev}>
      {direction === 'next' ? '>' : '<'}
    </button>
  );
};

export default CarouselBtn;
