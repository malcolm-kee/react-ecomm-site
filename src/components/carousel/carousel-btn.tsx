import cx from 'classnames';
import React from 'react';
import { CarouselContext } from './carousel-context';

export type CarouselBtnProps = { direction: 'next' | 'prev' };

export const CarouselBtn = ({ direction = 'next' }: CarouselBtnProps) => {
  const { next, prev } = React.useContext(CarouselContext);

  const isNext = direction === 'next';

  return (
    <button
      className={cx('carousel-control', isNext ? 'right' : 'left')}
      onClick={isNext ? next : prev}
    >
      <span
        className={cx(
          'glyphicon',
          isNext ? 'glyphicon-chevron-right' : 'glyphicon-chevron-left'
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{isNext ? 'Next' : 'Previous'}</span>
    </button>
  );
};
