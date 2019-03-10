import React from 'react';
import { Link } from '@reach/router';

export function Navbar() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Shopit
          </Link>
          <div className="navbar-text">
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
