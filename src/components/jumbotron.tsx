import React from 'react';

export interface JumbotronProps {
  title?: string;
  children: React.ReactNode;
}

export function Jumbotron({ title, children }: JumbotronProps) {
  return (
    <div className="jumbotron">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}

export default Jumbotron;
