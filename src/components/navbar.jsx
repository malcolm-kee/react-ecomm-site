import React from 'react';

export function Navbar({ children }) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">{children}</div>
      </div>
    </nav>
  );
}
