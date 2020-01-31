import { Link } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from './components/button';
import { Navbar } from './components/navbar';
import { attemptLogout } from './modules/auth/auth.actions';
import { AuthStatus } from './modules/auth/auth.constants';
import { selectAuthStatus, selectUser } from './modules/auth/auth.selectors';
import { CartLink } from './modules/cart/components/cart-link';

function SiteNavContent({ status, user, logout }) {
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
          {status === AuthStatus.Authenticated ? (
            <>
              <span className="text-lg sm:text-xl px-2 hidden sm:inline-block">
                {user && user.name}
              </span>
              <Button color="default" onClick={logout} size="sm">
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

const mapStates = state => ({
  status: selectAuthStatus(state),
  user: selectUser(state),
});

const mapDispatch = {
  logout: attemptLogout,
};

export const SiteNav = connect(mapStates, mapDispatch)(SiteNavContent);
