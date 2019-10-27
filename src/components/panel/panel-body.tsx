import cx from 'classnames';
import React from 'react';

export type PanelBodyProps = JSX.IntrinsicElements['div'];

export const PanelBody = ({ className, ...divProps }: PanelBodyProps) => {
  return <div className={cx('panel-body', className)} {...divProps} />;
};
