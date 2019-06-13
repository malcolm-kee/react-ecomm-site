import { Link } from 'gatsby';
import { inject, observer } from 'mobx-react';
import React from 'react';

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

export const CartLink = inject('cart')(
  observer(function CartLink({ cart: { totalItemCount }, ...restProps }) {
    return <CartLinkContent cartItemCount={totalItemCount} {...restProps} />;
  })
);
