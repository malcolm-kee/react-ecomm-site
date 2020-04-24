import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import styles from './progress.module.scss';

export const Progress = (props) => (
  <div
    className={cx(
      'shadow-inner my-1',
      props.thin ? 'h-1' : 'h-2',
      props.className
    )}
  >
    <div
      className={cx(
        'h-full',
        styles.bar,
        props.variant ? variantClasses[props.variant] : 'bg-blue-500'
      )}
      role="progressbar"
      aria-valuenow={props.percent}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: `${props.percent}%`,
      }}
    >
      <span className={props.showPercent ? undefined : 'sr-only'}>
        {props.percent}% Complete
      </span>
    </div>
  </div>
);

const variantClasses = {
  success: 'bg-green-500',
  info: 'bg-teal-500',
  warning: 'bg-orange-500',
  danger: 'bg-red-500',
};

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  showPercent: PropTypes.bool,
  thin: PropTypes.bool,
  className: PropTypes.string,
};
