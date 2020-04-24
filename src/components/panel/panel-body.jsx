import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

export const PanelBody = (props) => {
  return <div {...props} className={cx('px-3 py-2', props.className)} />;
};

PanelBody.propTypes = {
  className: PropTypes.string,
};
