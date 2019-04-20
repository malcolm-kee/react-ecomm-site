import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { CarouselContext } from './carousel-context';

export const CarouselBtn = ({ direction = 'next' }) => {
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

CarouselBtn.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev'])
};

export default CarouselBtn;
