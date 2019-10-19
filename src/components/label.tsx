import React from 'react';
import { FieldContext } from './field-context';

/**
 * Label is just a wrapper around html `label` element.
 *
 * It accepts all props `label` element accepts.
 *
 * However, it will sync its `htmlFor` with the id of the input within same `Field` component
 */
export function Label(props: JSX.IntrinsicElements['label']) {
  const { inputId } = React.useContext(FieldContext);

  return <label htmlFor={inputId} {...props} />;
}
