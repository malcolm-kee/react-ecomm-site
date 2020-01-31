import cx from 'classnames';
import { Link } from '@reach/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../type';
import { selectCartItemCount } from '../cart.selectors';
import { Badge } from '../../../components/badge';

type CartLinkContentProps = ConnectedProps<typeof connector> & {
  className?: string;
};

function CartLinkContent({ cartItemCount, className }: CartLinkContentProps) {
  return (
    <Link
      to="/cart"
      className={cx('relative inline-flex items-center', className)}
    >
      Cart
      {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
    </Link>
  );
}

const connector = connect((state: RootState) => ({
  cartItemCount: selectCartItemCount(state),
}));

export const CartLink = connector(CartLinkContent);
