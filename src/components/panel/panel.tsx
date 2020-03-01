import cx from 'classnames';
import React from 'react';
import { ContainerProps } from '../type';
import { PanelContext } from './panel-context';

export type PanelInjectedProps = {
  className: string;
  children?: React.ReactNode;
};

export type PanelProps = {
  color?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  className?: string;
  children?: React.ReactNode;
  /**
   * If you wish to insert arbitrary props or render other than a `div`, use this props.
   */
  renderContainer?: (props: ContainerProps) => JSX.Element;
};

const DefaultContainer = (injectedProps: PanelInjectedProps) => (
  <div {...injectedProps} />
);

export const Panel = ({
  color,
  children,
  className,
  renderContainer = DefaultContainer,
}: PanelProps) => {
  return (
    <PanelContext.Provider value={color}>
      {renderContainer({
        children,
        className: cx(
          'shadow bg-white',
          color && colorClasses[color],
          className
        ),
      })}
    </PanelContext.Provider>
  );
};

const colorClasses: Record<NonNullable<PanelProps['color']>, string> = {
  default: 'bg-white border-gray-700 text-gray-900',
  primary: 'bg-white border-blue-500 text-gray-900',
  success: 'bg-white border-green-500 text-gray-900',
  info: 'bg-white border-teal-500 text-gray-900',
  warning: 'bg-white border-orange-500 text-gray-900',
  danger: 'bg-white border-red-500 text-gray-900',
};
