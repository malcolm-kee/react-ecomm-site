import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const PanelBody = ({ children, className }) => {
  return <div className={cx('panel-body', className)}>{children}</div>;
};

PanelBody.propTypes = {
  className: PropTypes.string,
};
