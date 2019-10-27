import cx from 'classnames';
import React from 'react';

export type PanelHeading = JSX.IntrinsicElements['div'];

export const PanelHeading = ({ className, ...props }: PanelHeading) => {
  return <div className={cx('panel-heading', className)} {...props} />;
};
