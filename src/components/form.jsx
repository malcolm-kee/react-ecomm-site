import React from 'react';

export function Form({ title, children, ...formProps }) {
  return (
    <form {...formProps}>
      {title && <legend className="text-gray-700 mb-2">{title}</legend>}
      {children}
    </form>
  );
}
