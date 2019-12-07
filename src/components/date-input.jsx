import cx from 'classnames';
import $ from 'jquery';
import PropTypes from 'prop-types';
import * as React from 'react';
import '../lib/jquery.datepick.package-5.1.0/js/jquery.datepick';
import styles from './date-input.module.scss';
import { Input } from './input';

/**
 * `DateInput` is a wrapper over jquery.datepick plugin.
 *
 * @see http://keith-wood.name/datepick.html
 *
 */
export const DateInput = ({
  dateFormat = 'dd-mm-yyyy',
  className,
  onChangeValue,
  value,
  ...props
}) => {
  const inputRef = React.useRef(null);

  const onChangeValueRef = React.useRef(onChangeValue);
  onChangeValueRef.current = onChangeValue;

  const getDateValue = React.useCallback(
    date => {
      return $.datepick.formatDate(dateFormat, date);
    },
    [dateFormat]
  );

  React.useEffect(() => {
    $(inputRef.current).datepick({
      dateFormat,
      pickerClass: styles.datepick,
      showAnim: '',
      onSelect: dates => {
        if (onChangeValueRef.current) {
          onChangeValueRef.current(getDateValue(dates[0]));
        }
      },
    });
  }, [dateFormat, getDateValue]);

  React.useEffect(() => {
    const $input = $(inputRef.current);

    const currentValue = getDateValue($input.datepick('getDate')[0]);

    if (!value) {
      if (currentValue) {
        $input.datepick('clear');
      }
    } else if (value !== currentValue) {
      $input.datepick('setDate', value);
    }
  }, [value, getDateValue]);

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
        onClick={() => $(inputRef.current).datepick('show')}
      >
        <i className="glyphicon glyphicon-calendar" aria-hidden="true" />
        <span className="sr-only">open date picker</span>
      </button>
    </div>
  );
};

DateInput.propTypes = {
  /**
   * Format of the date for display and value
   *
   * @default 'dd-mm-yyyy';
   */
  dateFormat: PropTypes.string,
  value: PropTypes.string,
};
