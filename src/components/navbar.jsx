import * as React from 'react';

export function Navbar({ children }) {
  return (
    <nav className="bg-blue-600 text-gray-100">
      <div className="container mx-auto py-2 px-4">{children}</div>
    </nav>
  );
}
