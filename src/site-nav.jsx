import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './components/button';
import { Navbar } from './components/navbar';
import { CartLink } from './modules/cart/components/cart-link';

function SiteNavContent({ isAuthenticated, pending, user, logout }) {
  return (
    <Navbar>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link className="text-3xl px-2" to="/">
            Shopit
          </Link>
          <CartLink className="text-lg sm:text-xl px-2" />
          <Link className="text-lg sm:text-xl px-2" to="/help">
            Help
          </Link>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <span className="text-lg sm:text-xl px-2 hidden sm:inline-block">
                {user && user.name}
              </span>
              <Button
                color="default"
                onClick={logout}
                disabled={pending}
                size="sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" className="text-xl px-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export const SiteNav = inject('auth')(
  observer(function SiteNav({
    auth: { isAuthenticated, pending, user, logout },
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
