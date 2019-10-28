import { Link } from '@reach/router';
import { formatMoney } from 'accounting';
import React from 'react';
import { Button } from '../../../components/button';
import { ProductImage } from '../../products/components/product-image';
import { CartItem as CardItemType } from '../cart.type';

type CartItemProps = {
  index: number;
  item: CardItemType;
  onDecrement: () => void;
  onIncrement: () => void;
  onDelete: () => void;
};

function CartItem({
  index,
  item,
  onDecrement,
  onIncrement,
  onDelete
}: CartItemProps) {
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
          onClick={onDecrement}
          color="primary"
          size="sm"
          disabled={item.qty === 1}
          data-testid={`reduce-${item.product.id}`}
        >
          -
        </Button>
        <span data-testid={`qty-for-${item.product.id}`}>{item.qty}</span>
        <Button
          onClick={onIncrement}
          color="primary"
          size="sm"
          data-testid={`add-${item.product.id}`}
        >
          +
        </Button>
      </td>
      <td className="text-right">
        {item.product.price &&
          formatMoney(Number(item.product.price) * item.qty, '')}
      </td>
      <td>
        <Button
          onClick={onDelete}
          color="danger"
          size="sm"
          data-testid={`remove-${item.product.id}`}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;
