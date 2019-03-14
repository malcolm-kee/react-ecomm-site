import { Link } from '@reach/router';
import { formatMoney } from 'accounting';
import React from 'react';
import { Button } from '../../../components/button';
import { ProductImage } from '../../products/components/product-image';

export function CartItem({ index, item, onDecrement, onIncrement, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {item.product.images && (
          <ProductImage
            url={item.product.images['thumb-standard']}
            webpUrl={item.product.images['thumb-webp']}
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
          onClick={onDecrement}
          color="primary"
          size="sm"
          disabled={item.qty === 1}
        >
          -
        </Button>{' '}
        {item.qty}{' '}
        <Button onClick={onIncrement} color="primary" size="sm">
          +
        </Button>
      </td>
      <td className="text-right">
        {item.product.price &&
          formatMoney(Number(item.product.price) * item.qty, '')}
      </td>
      <td>
        <Button onClick={onDelete} color="danger" size="sm">
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;
