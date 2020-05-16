import Link from 'next/link';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { attemptLogout } from '../modules/auth/auth.actions';
import { selectAuthStatus, selectUser } from '../modules/auth/auth.selectors';
import { CartLink } from '../modules/cart/components/cart-link';
import { RootState } from '../type';
import { Button } from './button';
import { Navbar } from './navbar';

type ReduxProps = ConnectedProps<typeof connector>;

function SiteNavContent({ status, user, logout }: ReduxProps) {
  return (
    <Navbar>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-3xl px-2">
              <img
                src="/images/shopit-white-100.png"
                width={45}
                height={45}
                alt="Shopit"
              />
            </a>
          </Link>
          <CartLink className="text-lg sm:text-xl px-2" />
          <Link href="/help">
            <a className="text-lg sm:text-xl px-2">Help</a>
          </Link>
        </div>
        <div className="flex items-center">
          {status === 'Authenticated' ? (
            <>
              <span className="text-lg sm:text-xl px-2 hidden sm:inline-block">
                {user && user.name}
              </span>
              <Button color="default" onClick={logout} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <a className="text-xl px-2">Login</a>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}

const connector = connect(
  (state: RootState) => ({
    status: selectAuthStatus(state),
    user: selectUser(state),
  }),
  {
    logout: attemptLogout,
  }
);

export const SiteNav = connector(SiteNavContent);
