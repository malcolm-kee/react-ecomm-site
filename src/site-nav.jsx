import { Link } from '@reach/router';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Navbar } from './components/navbar';
import { CartLink } from './modules/cart/components/cart-link';

function SiteNavContent({ isAuthenticated, pending, user, logout }) {
  return (
    <Navbar>
      <Link className="navbar-brand" to="/">
        Shopit
      </Link>
      <CartLink to="/cart" className="navbar-brand" />
      {isAuthenticated ? (
        <>
          <span className="navbar-brand hidden-xs">{user && user.name}</span>
          <button
            className="btn btn-danger btn-sm"
            onClick={logout}
            type="button"
            disabled={pending}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className="navbar-brand">
          Login
        </Link>
      )}
    </Navbar>
  );
}

export const SiteNav = inject('auth')(
  observer(function SiteNav({
    auth: { isAuthenticated, pending, user, logout }
  }) {
    return (
      <SiteNavContent
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        pending={pending}
      />
    );
  })
);
