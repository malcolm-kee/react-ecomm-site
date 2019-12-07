import { Link } from '@reach/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navbar } from './components/navbar';
import { attemptLogout } from './modules/auth/auth.actions';
import { selectAuthStatus, selectUser } from './modules/auth/auth.selectors';
import { CartLink } from './modules/cart/components/cart-link';
import { RootState } from './type';

type ReduxProps = ConnectedProps<typeof connector>;

function SiteNavContent({ status, user, logout }: ReduxProps) {
  return (
    <Navbar>
      <Link className="navbar-brand" to="/">
        Shopit
      </Link>
      <CartLink className="navbar-brand" />
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

const mapStates = (state: RootState) => ({
  status: selectAuthStatus(state),
  user: selectUser(state),
});

const mapDispatch = {
  logout: attemptLogout,
};

const connector = connect(mapStates, mapDispatch);

export const SiteNav = connector(SiteNavContent);
