import { callAll } from 'lib/fn-lib';
import { formatMoney } from 'lib/format';
import * as React from 'react';
import { useRifm } from 'rifm';
import { Input, InputProps } from './input';

export type NumberInputProps = Omit<InputProps, 'value' | 'onChangeValue'> & {
  value: string;
  onChangeValue: (value: string) => void;
  decimals?: number;
  thousandSeparator?: string;
};

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  Omit<NumberInputProps, 'value' | 'onChangeValue'> & {
    value: string;
    onChangeValue: (value: string) => void;
  }
>(function NumberInput(
  { decimals = 2, onChangeValue, thousandSeparator, ...inputProps },
  forwardedRef
) {
  const { value, onChange } = useRifm({
    value: formatValue(inputProps.value, decimals),
    onChange: onChangeValue,
    accept: /[\d.]/g,
    format: (val) => formatFixedPointNumber(val, decimals, thousandSeparator),
  });

  return (
    <Input
      {...inputProps}
      value={value}
      onChange={callAll(onChange, inputProps.onChange)}
      ref={forwardedRef}
    />
  );
});

const formatValue = (value: string, decimals: number) => {
  if (new RegExp(`\\.\\d{${decimals}}$`).test(value)) {
    return value;
  }
  const num = Number(value);
  return (Number.isNaN(num) ? 0 : num).toFixed(decimals);
};

const numberAccept = /[\d.]+/g;

const parseNumber = (string: string) =>
  (string.match(numberAccept) || []).join('');

const formatFixedPointNumber = (
  value: string,
  digits: number,
  thousandSeparator?: string
) => {
  const parsed = parseNumber(value);
  const [head, tail] = parsed.split('.');
  // Avoid rounding errors at toLocaleString as when user enters 1.239 and maxDigits=2 we
  // must not to convert it to 1.24, it must stay 1.23
  const scaledTail = tail != null ? tail.slice(0, digits) : '';

  let number = Number.parseFloat(`${head}.${scaledTail}`);

  // For fixed format numbers deleting "." must be no-op
  // as imagine u have 123.45 then delete "." and get 12345.00 looks bad in UI
  // so we transform here 12345 into 123.45 instead of 12345.00.
  // The main disadvantage of this, that you need carefully check input value
  // that it always has fractional part
  if (digits > 0 && tail == null) {
    const paddedHead = head.padStart(digits + 1 - head.length, '0');
    number = Number.parseFloat(
      `${paddedHead.slice(0, -digits)}.${paddedHead.slice(-digits)}`
    );
  }

  if (Number.isNaN(number)) {
    return '';
  }

  return formatMoney(number, { decimalPlaces: digits, thousandSeparator });
};
