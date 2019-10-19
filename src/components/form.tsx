import React from 'react';

export type FormProps = {
  title?: React.ReactNode;
} & Omit<JSX.IntrinsicElements['form'], 'title'>;

export function Form({ title, children, ...formProps }: FormProps) {
  return (
    <form {...formProps}>
      {title && <legend>{title}</legend>}
      {children}
    </form>
  );
}
