import React from 'react';

export interface NavbarProps {
  children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div
          className="navbar-header"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {children}
        </div>
      </div>
    </nav>
  );
}
