import { Link } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../type';
import { selectCartItemCount } from '../cart.selectors';

type CartLinkContentProps = ReturnType<typeof mapStates> & {
  className?: string;
};

function CartLinkContent({ cartItemCount, className }: CartLinkContentProps) {
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

const mapStates = (state: RootState) => ({
  cartItemCount: selectCartItemCount(state),
});

export const CartLink = connect(mapStates)(CartLinkContent);
