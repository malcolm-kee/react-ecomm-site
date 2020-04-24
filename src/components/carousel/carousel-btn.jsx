import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { LeftIcon } from '../icon/left-icon';
import { RightIcon } from '../icon/right-icon';
import styles from './carousel-btn.module.scss';
import { CarouselContext } from './carousel-context';

export const CarouselBtn = ({ direction = 'next' }) => {
  const { next, prev } = React.useContext(CarouselContext);

  const isNext = direction === 'next';

  return (
    <button
      className={cx(
        'text-white',
        styles.control,
        isNext ? styles.right : styles.left
      )}
      onClick={isNext ? next : prev}
    >
      {isNext ? (
        <RightIcon width={72} className="inline-block fill-current" />
      ) : (
        <LeftIcon width={72} className="inline-block fill-current" />
      )}
      <span className="sr-only">{isNext ? 'Next' : 'Previous'}</span>
    </button>
  );
};

CarouselBtn.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev']),
};
