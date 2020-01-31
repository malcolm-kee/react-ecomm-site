import React from 'react';

export function Jumbotron({ title, children }) {
  return (
    <div className="px-12 sm:px-16 py-10 sm:py-12 rounded-lg bg-teal-200">
      {title && <h1 className="text-5xl text-gray-700">{title}</h1>}
      {children}
    </div>
  );
}
