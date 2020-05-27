import { Button } from 'components/button';
import { CloseIcon } from 'components/icon/close-icon';
import { formatMoney } from 'lib/format';
import * as React from 'react';
import { Link } from 'react-router-dom';
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
  onDelete,
}: CartItemProps) {
  return (
    <div className="mb-2 pb-2 border-b border-gray-300">
      <div className="flex justify-between items-center">
        <Link className="text-blue-700" to={`/product/${item.product._id}`}>
          #{index + 1} {item.product.name}
        </Link>
        <Button
          onClick={onDelete}
          size="sm"
          aria-labelledby={`${item.product._id}-remove-label`}
        >
          <CloseIcon width={36} className="fill-current text-gray-500" />
        </Button>
        <span className="sr-only" id={`${item.product._id}-remove-label`}>
          Remove {item.product.name}
        </span>
      </div>
      <div className="flex">
        <div className="w-32">
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
        </div>
        <div className="mx-2 flex-1 text-right">
          <div>
            <Button
              onClick={onDecrement}
              color="primary"
              size="sm"
              disabled={item.qty === 1}
            >
              -
            </Button>
            <span className="mx-1">{item.qty}</span>
            <Button onClick={onIncrement} color="primary" size="sm">
              +
            </Button>
          </div>
          <div className="mt-3">
            <span className="mr-1">RM</span>
            <output className="text-2xl">
              {item.product.price &&
                formatMoney(Number(item.product.price) * item.qty)}
            </output>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
