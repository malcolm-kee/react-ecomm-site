import cx from 'classnames';
import * as React from 'react';

export type PanelBodyProps = JSX.IntrinsicElements['div'];

export const PanelBody = ({ className, ...divProps }: PanelBodyProps) => {
  return <div className={cx('px-3 py-2', className)} {...divProps} />;
};
