import cx from 'classnames';
import * as React from 'react';
import styles from './progress.module.scss';

export type ProgressProps = {
  percent: number;
  variant?: 'success' | 'info' | 'warning' | 'danger';
  showPercent?: boolean;
  thin?: boolean;
  className?: string;
};

export const Progress = (props: ProgressProps) => (
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
