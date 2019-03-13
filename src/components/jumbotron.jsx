import React from 'react';

export function Jumbotron({ title, children }) {
  return (
    <div className="jumbotron">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}

export default Jumbotron;
