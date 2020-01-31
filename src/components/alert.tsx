import cx from 'classnames';
import React from 'react';

export type AlertProps = {
  /**
   * You're required to specify the color because "default alert" doesn't make too much sense.
   */
  color: 'success' | 'info' | 'warning' | 'danger';
  dismissible?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Alert = ({
  color,
  children,
  dismissible,
  className,
}: AlertProps) => {
  const [show, setShow] = React.useState(true);

  return show ? (
    <div
      className={cx(
        'border-2 px-3 py-2 rounded-lg',
        colorClasses[color],
        dismissible && 'relative',
        className
      )}
      role="alert"
    >
      {dismissible && (
        <button
          onClick={() => setShow(false)}
          type="button"
          className={cx(
            'absolute top-0 right-0 px-2 text-xl leading-none font-bold',
            btnClasses[color]
          )}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
      {children}
    </div>
  ) : null;
};

const colorClasses: Record<AlertProps['color'], string> = {
  success: 'border-green-500 bg-green-100 text-green-900',
  info: 'border-teal-500 bg-teal-100 text-teal-900',
  warning: 'border-orange-500 bg-orange-100 text-orange-900',
  danger: 'border-red-500 bg-red-100 text-red-900',
};

const btnClasses: Record<AlertProps['color'], string> = {
  success: 'text-green-500',
  info: 'text-teal-500',
  warning: 'text-orange-500',
  danger: 'text-red-500',
};
