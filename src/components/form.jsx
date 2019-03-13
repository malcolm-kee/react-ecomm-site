import React from 'react';

export function Form({ title, children, ...formProps }) {
  return (
    <form {...formProps}>
      {title && <legend>{title}</legend>}
      {children}
    </form>
  );
}
