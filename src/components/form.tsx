import * as React from 'react';

export type FormProps = {
  title?: React.ReactNode;
} & Omit<JSX.IntrinsicElements['form'], 'title'>;

export function Form({ title, children, ...formProps }: FormProps) {
  return (
    <form {...formProps}>
      {title && <legend className="text-gray-700 mb-2">{title}</legend>}
      {children}
    </form>
  );
}
