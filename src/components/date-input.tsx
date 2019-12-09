import cx from 'classnames';
import $ from 'jquery';
import * as React from 'react';
import '../lib/jquery.datepick.package-5.1.0/js/jquery.datepick';
import styles from './date-input.module.scss';
import { Input, InputProps } from './input';
import { useLatest } from '../hooks/use-latest';

type DateInputProps = InputProps & {
  /**
   * Format of the date for display and value
   *
   * @default 'dd-mm-yyyy';
   */
  dateFormat?: string;
  value?: string;
};

/**
 * `DateInput` is a wrapper over jquery.datepick plugin.
 *
 * @see http://keith-wood.name/datepick.html
 *
 * Since it has jquery dependencies, lazy load it with `date-input-default`.
 */
export const DateInput = ({
  dateFormat = 'dd-mm-yyyy',
  className,
  onChangeValue,
  value,
  ...props
}: DateInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeValueRef = useLatest(onChangeValue);

  const getDateValue = React.useCallback(
    (date: Date) => {
      return $.datepick.formatDate(dateFormat, date);
    },
    [dateFormat]
  );

  React.useEffect(() => {
    $(inputRef.current as HTMLInputElement).datepick({
      dateFormat,
      pickerClass: styles.datepick,
      showAnim: '',
      onSelect: dates => {
        if (onChangeValueRef.current) {
          onChangeValueRef.current(getDateValue(dates[0]));
        }
      },
    });
  }, [dateFormat, getDateValue, onChangeValueRef]);

  React.useEffect(() => {
    const $input = $(inputRef.current as HTMLInputElement);

    const currentValue = getDateValue($input.datepick('getDate')[0]);

    if (!value) {
      if (currentValue) {
        $input.datepick('clear');
      }
    } else if (value !== currentValue) {
      $input.datepick('setDate', value);
    }
  }, [value, getDateValue]);

  React.useEffect(() => {
    const $input = $(inputRef.current as HTMLInputElement);
    return function cleanup() {
      $input.datepick('destroy');
    };
  }, []);

  React.useEffect(() => {
    if (props.autoFocus) {
      $(inputRef.current as HTMLInputElement).datepick('show');
    }
  }, [props.autoFocus]);

  return (
    <div className={styles.wrapper}>
      <Input
        className={cx(styles.input, className)}
        readOnly
        {...props}
        ref={inputRef}
      />
      <button
        className={styles.icon}
        type="button"
        onClick={() => $(inputRef.current as HTMLInputElement).datepick('show')}
      >
        <i className="glyphicon glyphicon-calendar" aria-hidden="true" />
        <span className="sr-only">open date picker</span>
      </button>
    </div>
  );
};
