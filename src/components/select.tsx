import cx from 'classnames';
import * as React from 'react';
import { callAll } from '../lib/fn-lib';
import { FieldContext } from './field-context';

export type SelectProps = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  'size'
> & {
  /**
   * callback to be invoked when input change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
  /**
   * Helper props to generate the options. Alternatively you can construct the option markdown as children.
   */
  options?: Array<{
    label: React.ReactNode;
    value: string;
  }>;
  size?: 'sm' | 'lg';
};

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
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      size,
      onChangeValue,
      onChange,
      options,
      className,
      children,
      id,
      ...selectProps
    },
    ref
  ) {
    const { inputId, setInputId } = React.useContext(FieldContext);

    React.useEffect(() => {
      if (id && id !== inputId) {
        setInputId(id);
      }
    }, [id, setInputId, inputId]);

    return (
      <select
        className={cx(
          'block form-select m-0 w-full rounded-lg',
          size ? sizeClasses[size] : 'text-base py-1',
          className
        )}
        id={inputId}
        onChange={callAll(
          onChange,
          onChangeValue && ((ev) => onChangeValue(ev.target.value))
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
  }
);

const sizeClasses: Record<NonNullable<SelectProps['size']>, string> = {
  sm: 'text-xs py-1',
  lg: 'text-lg py-2',
};
