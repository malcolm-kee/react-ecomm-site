import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { callAll } from '../lib/fn-lib';
import { FieldContext } from './field-context';

/**
 * `Input` is a wrapper around `input` element.
 *
 * It accepts all props an `input` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `input` element.
 *
 * Most of the time you want to wrap this within `Field` component so it will provides
 * contextual styling and good defaults on props
 */
export const Input = React.forwardRef(function Input(
  { className, onChangeValue, onChange, size, ...inputProps },
  ref
) {
  const { inputId, setInputId } = React.useContext(FieldContext);

  React.useEffect(() => {
    if (inputProps.id && inputProps.id !== inputId) {
      setInputId(inputProps.id);
    }
  }, [inputProps.id, setInputId, inputId]);

  return (
    <input
      className={cx(
        'block m-0 w-full border border-gray-300 rounded-lg px-3 shadow-inner text-gray-900',
        size ? sizeClasses[size] : 'text-base py-1',
        className
      )}
      id={inputId}
      aria-describedby={`${inputId}-help`}
      onChange={callAll(
        onChange,
        onChangeValue && (ev => onChangeValue(ev.target.value))
      )}
      {...inputProps}
      ref={ref}
    />
  );
});

const sizeClasses = {
  sm: 'text-xs py-1',
  lg: 'text-lg py-2',
};

Input.propTypes = {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
};
