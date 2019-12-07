import { Link } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';

import { selectCartItemCount } from '../cart.selectors';

function CartLinkContent({ cartItemCount, className }) {
  return (
    <Link to="/cart" className={className}>
      Cart
      {!!cartItemCount && (
        <span className="badge" style={{ marginLeft: 3 }}>
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}

const mapStates = state => ({
  cartItemCount: selectCartItemCount(state),
});

export const CartLink = connect(mapStates)(CartLinkContent);
