import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/badge';

function CartLinkContent({ cartItemCount, className }) {
  return (
    <Link to="/cart" className={className}>
      Cart
      {!!cartItemCount && <Badge>{cartItemCount}</Badge>}
    </Link>
  );
}

export const CartLink = inject('cart')(
  observer(function CartLink({ cart: { totalItemCount }, ...restProps }) {
    return <CartLinkContent cartItemCount={totalItemCount} {...restProps} />;
  })
);
