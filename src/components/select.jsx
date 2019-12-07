import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { callAll } from '../lib/fn-lib';
import { FieldContext } from './field-context';

/**
 * `Select` is a wrapper around `select` element.
 *
 * It accepts all props an `select` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `select` element.
 *
 * Most of the time you want to wrap this within `Field` component so it will provides
 * contextual styling and good defaults on props
 */
export const Select = React.forwardRef(function Select(
  {
    size,
    onChangeValue,
    onChange,
    options,
    className,
    children,
    required,
    ...selectProps
  },
  ref
) {
  const { inputId, setInputId } = React.useContext(FieldContext);

  React.useEffect(() => {
    if (selectProps.id && selectProps.id !== inputId) {
      setInputId(selectProps.id);
    }
  }, [selectProps.id, setInputId, inputId]);

  return (
    <select
      className={cx('form-control', size && `input-${size}`, className)}
      id={inputId}
      required={required}
      onChange={callAll(
        onChange,
        onChangeValue && (ev => onChangeValue(ev.target.value))
      )}
      {...selectProps}
      ref={ref}
    >
      {!selectProps.multiple && <option value=""></option>}
      {options &&
        options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      {children}
    </select>
  );
});

Select.propTypes = {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue: PropTypes.func,
  /**
   * Helper props to generate the options. Alternatively you can construct the option markdown as children.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  size: PropTypes.oneOf(['sm', 'lg']),
};
