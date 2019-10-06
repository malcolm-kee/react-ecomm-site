import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const PanelFooter = ({ children, className }) => {
  return <div className={cx('panel-footer', className)}>{children}</div>;
};

PanelFooter.propTypes = {
  className: PropTypes.string
};
