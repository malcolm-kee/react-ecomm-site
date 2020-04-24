import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import './spinner.css';

/**
 * Spinner is used to indicate busy status, e.g. waiting for API response
 */
export function Spinner({ delayShow = 0, className }) {
  const [show, setShow] = React.useState(delayShow ? false : true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), delayShow);

    return () => clearTimeout(timer);
  }, [delayShow]);

  return show ? (
    <div className={cx('spinner', className)} role="progressbar">
      <div className="spinner-inner">
        <svg viewBox="22 22 44 44">
          <circle fill="none" cx="44" cy="44" r="16" strokeWidth="4" />
        </svg>
      </div>
    </div>
  ) : null;
}

Spinner.propTypes = {
  /**
   * wait time in milisecond before show the spinner.
   *
   * You want want to set this to avoid flashing spinner for quick network
   */
  delayShow: PropTypes.number,
};
