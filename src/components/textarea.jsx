import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { callAll } from '../lib/fn-lib';
import { FieldContext } from './field-context';

/**
 * `Textarea` is a wrapper around `textarea` element.
 *
 * It accepts all props an `textarea` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `textarea` element.
 *
 * Most of the time you want to wrap this within `Field` component so it will provides
 * contextual styling and good defaults on props
 */
export const Textarea = React.forwardRef(function Textarea(
  { className, minRows = 3, onChangeValue, onChange, ...textareaProps },
  forwardedRef
) {
  const { inputId, setInputId } = React.useContext(FieldContext);
  React.useEffect(() => {
    if (textareaProps.id && textareaProps.id !== inputId) {
      setInputId(textareaProps.id);
    }
  }, [textareaProps.id, inputId, setInputId]);

  return (
    <TextareaAutosize
      className={cx(
        'text-base block m-0 w-full border border-gray-300 rounded-lg px-3 py-1 shadow-inner text-gray-900',
        className
      )}
      minRows={minRows}
      id={inputId}
      onChange={callAll(
        onChange,
        onChangeValue && ((ev) => onChangeValue(ev.target.value))
      )}
      {...textareaProps}
      ref={forwardedRef}
    />
  );
});

Textarea.propTypes = {
  /**
   * callback to be invoked when value change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue: PropTypes.func,
};
