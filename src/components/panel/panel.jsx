import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PanelContext } from './panel-context';

export const Panel = ({
  color,
  children,
  className,
  renderContainer = DefaultContainer,
}) => {
  return (
    <PanelContext.Provider value={color}>
      {renderContainer({
        children,
        className: cx(
          'border-2 shadow',
          color && colorClasses[color],
          className
        ),
      })}
    </PanelContext.Provider>
  );
};

const DefaultContainer = (injectedProps) => <div {...injectedProps} />;

const colorClasses = {
  default: 'bg-white border-gray-700 text-gray-900',
  primary: 'bg-white border-blue-500 text-gray-900',
  success: 'bg-white border-green-500 text-gray-900',
  info: 'bg-white border-teal-500 text-gray-900',
  warning: 'bg-white border-orange-500 text-gray-900',
  danger: 'bg-white border-red-500 text-gray-900',
};

Panel.propTypes = {
  color: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ]),
  className: PropTypes.string,
  /**
   * If you wish to insert arbitrary props or render other than a `div`, use this props.
   */
  renderContainer: PropTypes.func,
};
