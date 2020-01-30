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

const variantClasses: Record<NonNullable<ProgressProps['variant']>, string> = {
  success: 'bg-green-500',
  info: 'bg-teal-500',
  warning: 'bg-orange-500',
  danger: 'bg-red-500',
};
