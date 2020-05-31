import { Badge } from 'components/badge';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

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
