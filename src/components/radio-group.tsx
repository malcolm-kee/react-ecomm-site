import React from 'react';
import { isPrimitive, isDefined } from '../lib/typecheck';
import { getId } from '../lib/id';

type Option<Value> = {
  value: Value;
  label: React.ReactNode;
};

export type RadioGroupProps<ValueType> = {
  value: ValueType;
  onChangeValue: (newValue: ValueType | null) => void;
  options: Array<Option<ValueType>>;
  id?: string;
  label?: React.ReactNode;
  name?: string;
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
  options = [],
  id
}: RadioGroupProps<Value>) => {
  const [defaultId] = React.useState(() => getId());
  const usedId = isDefined(id) ? id : name || defaultId;

  return (
    <div className="form-group" id={id}>
      {label && <label className="control-label">{label}</label>}
      <div>
        {options.map((option, index) => (
          <label
            className="radio-inline"
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
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
