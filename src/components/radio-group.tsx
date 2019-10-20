import React from 'react';
import { isPrimitive } from '../lib/typecheck';

type Option<Value> = {
  value: Value;
  label: React.ReactNode;
};

export type RadioGroupProps<ValueType> = {
  label?: React.ReactNode;
  value: ValueType;
  onChangeValue: (newValue: ValueType | null) => void;
  name?: string;
  options: Array<Option<ValueType>>;
};

/**
 * `RadioGroup` is like a `select`, but you can pass string, boolean, number, or object as value in `options`.
 * When the option is selected, `onChangeValue` will be called with the value you pass without convert it to string.
 */
export const RadioGroup = <Value extends any = string>({
  label,
  value,
  onChangeValue,
  name,
  options = []
}: RadioGroupProps<Value>) => {
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
