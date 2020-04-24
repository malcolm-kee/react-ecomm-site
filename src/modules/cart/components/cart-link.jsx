import cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/badge';
import { selectCartItemCount } from '../cart.selectors';

function CartLinkContent({ cartItemCount, className }) {
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

const mapStates = (state) => ({
  cartItemCount: selectCartItemCount(state),
});

export const CartLink = connect(mapStates)(CartLinkContent);
