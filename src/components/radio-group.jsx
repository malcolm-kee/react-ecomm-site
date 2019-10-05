import PropsTypes from 'prop-types';
import React from 'react';
import { isPrimitive } from '../lib/typecheck';

/**
 * `RadioGroup` is like a `select`, but you can pass string, boolean, number, or object as value in `options`.
 * When the option is selected, `onChangeValue` will be called with the value you pass without convert it to string.
 */
export const RadioGroup = ({
  label,
  value,
  onChangeValue,
  name,
  options = []
}) => {
  return (
    <div className="form-group">
      {label && <label className="control-label">{label}</label>}
      <div>
        {options.map((option, index) => (
          <label
            className="radio-inline"
            htmlFor={`${name}-${index}`}
            key={index}
          >
            <input
              type="radio"
              id={`${name}-${index}`}
              value={isPrimitive(option.value) ? `${option.value}` : undefined}
              onChange={ev => {
                if (ev.target.checked) {
                  onChangeValue(option.value);
                } else {
                  onChangeValue(null);
                }
              }}
              checked={value === option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  value: PropsTypes.oneOfType([
    PropsTypes.string,
    PropsTypes.bool,
    PropsTypes.number,
    PropsTypes.object
  ]).isRequired,
  onChangeValue: PropsTypes.func.isRequired,
  options: PropsTypes.arrayOf(
    PropsTypes.shape({
      label: PropsTypes.string.isRequired,
      value: PropsTypes.oneOfType([
        PropsTypes.string,
        PropsTypes.bool,
        PropsTypes.number,
        PropsTypes.object
      ]).isRequired
    })
  ).isRequired,
  label: PropsTypes.string,
  /**
   * name to be for all the radio inputs
   */
  name: PropsTypes.string
};
