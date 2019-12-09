import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './progress.module.scss';

export const Progress = props => (
  <div className={cx('progress', props.thin && styles.thin, props.className)}>
    <div
      className={cx(
        'progress-bar',
        props.variant && `progress-bar-${props.variant}`
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

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  showPercent: PropTypes.bool,
  thin: PropTypes.bool,
  className: PropTypes.string,
};
