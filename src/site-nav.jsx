import { Link } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from './components/navbar';
import { attemptLogout } from './modules/auth/auth.actions';
import { selectAuthStatus, selectUser } from './modules/auth/auth.selectors';
import { CartLink } from './modules/cart/components/cart-link';

function SiteNavContent({ status, user, logout }) {
  return (
    <Navbar>
      <Link className="navbar-brand" to="/">
        Shopit
      </Link>
      <CartLink to="/cart" className="navbar-brand" />
      {status === 'Anonymous' && (
        <Link to="/login" className="navbar-brand">
          Login
        </Link>
      )}
      <Link className="navbar-brand" to="/help">
        Help
      </Link>
      {status === 'Authenticated' && (
        <>
          <span className="navbar-brand hidden-xs">{user && user.name}</span>
          <button
            className="btn btn-danger btn-sm"
            onClick={logout}
            type="button"
          >
            Logout
          </button>
        </>
      )}
    </Navbar>
  );
}

const mapStates = state => ({
  status: selectAuthStatus(state),
  user: selectUser(state)
});

const mapDispatch = {
  logout: attemptLogout
};

export const SiteNav = connect(
  mapStates,
  mapDispatch
)(SiteNavContent);
