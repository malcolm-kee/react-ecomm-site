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
      <Link className="text-3xl px-2" to="/">
        Shopit
      </Link>
      <CartLink className="text-xl px-2" />
      {status === 'Anonymous' && (
        <Link to="/login" className="text-xl px-2">
          Login
        </Link>
      )}
      <Link className="text-xl px-2" to="/help">
        Help
      </Link>
      {status === 'Authenticated' && (
        <>
          <span className="text-xl px-2 hidden sm:block">
            {user && user.name}
          </span>
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
