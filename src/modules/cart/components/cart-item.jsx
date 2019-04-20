import { Link } from '@reach/router';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button } from '../../../components/button';
import { ProductImage } from '../../products/components/product-image';

function CartItem({ cart: { items }, index, onDelete }) {
  const item = items[index];
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="col-xs-2 col-lg-1">
        {item.product.images && (
          <ProductImage
            url={item.product.images.thumbStandard}
            webpUrl={item.product.images.thumbWebp}
            blurUrl={item.product.images.thumbBlur}
            alt={item.product.name}
            width={188}
            height={188}
          />
        )}
      </td>
      <td>
        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
      </td>
      <td className="text-right">{item.product.price}</td>
      <td>
        <Button
          onClick={item.decrementQty}
          color="primary"
          size="sm"
          disabled={!item.canDecrement}
        >
          -
        </Button>
        <span data-testid={`qty-for-${item.product.id}`}>{item.qty}</span>
        <Button onClick={item.incrementQty} color="primary" size="sm">
          +
        </Button>
      </td>
      <td className="text-right">{item.totalPrice}</td>
      <td>
        <Button onClick={onDelete} color="danger" size="sm">
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default inject('cart')(observer(CartItem));
