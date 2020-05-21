import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

export const Alert = ({ color, children, dismissible, className }) => {
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

const colorClasses = {
  success: 'border-green-500 bg-green-100 text-green-900',
  info: 'border-teal-500 bg-teal-100 text-teal-900',
  warning: 'border-orange-500 bg-orange-100 text-orange-900',
  danger: 'border-red-500 bg-red-100 text-red-900',
};

const btnClasses = {
  success: 'text-green-500',
  info: 'text-teal-500',
  warning: 'text-orange-500',
  danger: 'text-red-500',
};

Alert.propTypes = {
  /**
   * You're required to specify the color because "default alert" doesn't make too much sense.
   */
  color: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  dismissible: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
