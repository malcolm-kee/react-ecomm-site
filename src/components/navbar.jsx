import React from 'react';
import { Link } from '@reach/router';
import { CartLink } from '../modules/cart/components/cart-link';

export function Navbar() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Shopit
          </Link>
          <CartLink to="/cart" className="navbar-brand" />
          <Link to="/profile" className="navbar-brand">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
