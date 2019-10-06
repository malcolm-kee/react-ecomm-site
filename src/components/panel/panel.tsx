import cx from 'classnames';
import React from 'react';

export interface PanelInjectedProps {
  className: string;
  children?: React.ReactNode;
}

export interface PanelProps {
  color: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
  className?: string;
  children?: React.ReactNode;
  /**
   * If you wish to insert arbitrary props or render other than a `div`, use this props.
   *
   * We use `renderContainer` props instead of `as` props so we can have proper type-checking.
   * See https://blog.andrewbran.ch/polymorphic-react-components/.
   */
  renderContainer?: (props: PanelInjectedProps) => JSX.Element;
}

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
