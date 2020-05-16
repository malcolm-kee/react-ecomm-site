import cx from 'classnames';
import Link from 'next/link';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Badge } from '../../../components/badge';
import { RootState } from '../../../type';
import { selectCartItemCount } from '../cart.selectors';

type CartLinkContentProps = ConnectedProps<typeof connector> & {
  className?: string;
};

function CartLinkContent({ cartItemCount, className }: CartLinkContentProps) {
  return (
    <Link href="/cart">
      <a className={cx('relative inline-flex items-center', className)}>
        Cart
        {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
      </a>
    </Link>
  );
}

const connector = connect((state: RootState) => ({
  cartItemCount: selectCartItemCount(state),
}));

export const CartLink = connector(CartLinkContent);
