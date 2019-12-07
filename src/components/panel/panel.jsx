import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const Panel = ({ color, children, className }) => {
  return (
    <div className={cx('panel', color && `panel-${color}`, className)}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  color: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ]),
  className: PropTypes.string,
};
