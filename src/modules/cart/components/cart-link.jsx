import { Link } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { Badge } from '../../../components/badge';
import React from 'react';

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
