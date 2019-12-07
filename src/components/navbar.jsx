import React from 'react';

export function Navbar({ children }) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div
          className="navbar-header"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </div>
    </nav>
  );
}
