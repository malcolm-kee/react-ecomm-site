import PropsTypes from 'prop-types';
import React from 'react';
import { useId } from '../hooks/use-id';
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
  options = [],
  id,
}) => {
  const usedId = useId(id || name);

  return (
    <div className="mb-2" id={id}>
      {label && <label className="font-semibold">{label}</label>}
      <div>
        {options.map((option, index) => (
          <label
            className="inline-flex items-center mr-2"
            htmlFor={`${usedId}-${index}`}
            key={index}
          >
            <input
              type="radio"
              id={`${usedId}-${index}`}
              value={isPrimitive(option.value) ? `${option.value}` : undefined}
              onChange={ev => {
                if (ev.target.checked) {
                  onChangeValue(option.value);
                } else {
                  onChangeValue(null);
                }
              }}
              checked={value === option.value}
              className="mr-1"
            />
            <span>{option.label}</span>
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
    PropsTypes.object,
  ]),
  onChangeValue: PropsTypes.func.isRequired,
  options: PropsTypes.arrayOf(
    PropsTypes.shape({
      label: PropsTypes.string.isRequired,
      value: PropsTypes.oneOfType([
        PropsTypes.string,
        PropsTypes.bool,
        PropsTypes.number,
        PropsTypes.object,
      ]).isRequired,
    })
  ).isRequired,
  label: PropsTypes.string,
  /**
   * name to be for all the radio inputs
   */
  name: PropsTypes.string,
};
