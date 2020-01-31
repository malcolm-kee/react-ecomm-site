import cx from 'classnames';
import React from 'react';
import { PanelContext, PanelColor } from './panel-context';

export type PanelHeading = JSX.IntrinsicElements['div'];

export const PanelHeading = ({ className, ...props }: PanelHeading) => {
  const color = React.useContext(PanelContext);

  return (
    <div
      className={cx('px-3 py-1', color && colorClasses[color], className)}
      {...props}
    />
  );
};

const colorClasses: Record<NonNullable<PanelColor>, string> = {
  default: 'bg-gray-700 text-gray-100',
  primary: 'bg-blue-500 text-gray-100',
  success: 'bg-green-500 text-gray-100',
  info: 'bg-teal-500 text-gray-100',
  warning: 'bg-orange-500 text-gray-100',
  danger: 'bg-red-500 text-gray-100',
};
