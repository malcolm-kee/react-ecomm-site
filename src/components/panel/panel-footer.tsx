import cx from 'classnames';
import * as React from 'react';
import { PanelColor, PanelContext } from './panel-context';

export type PanelFooterProps = JSX.IntrinsicElements['div'];

export const PanelFooter = ({ className, ...divProps }: PanelFooterProps) => {
  const color = React.useContext(PanelContext);

  return (
    <div
      className={cx(
        'px-3 py-1 text-sm',
        color && colorClasses[color],
        className
      )}
      {...divProps}
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
