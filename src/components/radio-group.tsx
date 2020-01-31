import * as React from 'react';
import { useId } from '../hooks/use-id';
import { isPrimitive } from '../lib/typecheck';

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
  id,
}: RadioGroupProps<Value>) => {
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
