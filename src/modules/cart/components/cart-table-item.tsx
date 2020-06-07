import { Button } from 'components/button';
import { CloseIcon } from 'components/icon/close-icon';
import { formatMoney } from 'lib/format';
import { ProductImage } from 'modules/products/components/product-image';
import Link from 'next/link';
import * as React from 'react';
import { CartItem as CardItemType } from '../cart.type';

type CartItemProps = {
  index: number;
  item: CardItemType;
  onDecrement: () => void;
  onIncrement: () => void;
  onDelete: () => void;
};

export function CartTableItem({
  index,
  item,
  onDecrement,
  onIncrement,
  onDelete,
}: CartItemProps) {
  return (
    <tr className="border-b border-gray-300">
      <td>{index + 1}</td>
      <td>
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
      <td className="px-2">
        <Link href="/product/[pid]" as={`/product/${item.product.id}`}>
          <a className="text-blue-700">{item.product.name}</a>
        </Link>
      </td>
      <td className="text-right">{item.product.price}</td>
      <td className="text-center">
        <Button
          onClick={onDecrement}
          color="primary"
          size="sm"
          disabled={item.qty === 1}
          data-testid={`reduce-${item.product.id}`}
          aria-label="Reduce Quantity"
        >
          -
        </Button>
        <span className="mx-1" data-testid={`qty-for-${item.product.id}`}>
          {item.qty}
        </span>
        <Button
          onClick={onIncrement}
          color="primary"
          size="sm"
          data-testid={`add-${item.product.id}`}
          aria-label="Increase Quantity"
        >
          +
        </Button>
      </td>
      <td className="text-right text-xl">
        {item.product.price &&
          formatMoney(Number(item.product.price) * item.qty)}
      </td>
      <td>
        <Button
          onClick={onDelete}
          size="sm"
          data-testid={`remove-${item.product.id}`}
          aria-labelledby={`${item.product.id}-remove-label`}
        >
          <CloseIcon width={36} className="fill-current text-gray-500" />
        </Button>
        <span className="sr-only" id={`${item.product.id}-remove-label`}>
          Remove {item.product.name}
        </span>
      </td>
    </tr>
  );
}
