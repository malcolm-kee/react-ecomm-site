import cx from 'classnames';
import React from 'react';
import { ContainerProps } from '../type';

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
  renderContainer = DefaultContainer
}: PanelProps) => {
  return renderContainer({
    children,
    className: cx('panel', color && `panel-${color}`, className)
  });
};
