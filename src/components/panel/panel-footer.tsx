import cx from 'classnames';
import React from 'react';

export type PanelFooter = JSX.IntrinsicElements['div'];

export const PanelFooter = ({ className, ...divProps }: PanelFooter) => {
  return <div className={cx('panel-footer', className)} {...divProps} />;
};
