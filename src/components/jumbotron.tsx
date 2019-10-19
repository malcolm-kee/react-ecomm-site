import React from 'react';

export type JumbotronProps = {
  title?: string;
  children: React.ReactNode;
};

export function Jumbotron({ title, children }: JumbotronProps) {
  return (
    <div className="jumbotron">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
