import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const PanelHeading = ({ children, className }) => {
  return <div className={cx('panel-heading', className)}>{children}</div>;
};

PanelHeading.propTypes = {
  className: PropTypes.string,
};
