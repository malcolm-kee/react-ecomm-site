import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/button';
import { CloseIcon } from '../../../components/icon/close-icon';
import { ProductImage } from '../../products/components/product-image';

function CartTableItem({ cart: { items }, index, onDelete }) {
  const item = items[index];

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
        <Link className="text-blue-700" to={`/product/${item.product.id}`}>
          {item.product.name}
        </Link>
      </td>
      <td className="text-right">{item.product.price}</td>
      <td className="text-center">
        <Button
          onClick={item.decrementQty}
          color="primary"
          size="sm"
          disabled={!item.canDecrement}
          data-testid={`reduce-${item.product.id}`}
        >
          -
        </Button>
        <span className="mx-1" data-testid={`qty-for-${item.product.id}`}>
          {item.qty}
        </span>
        <Button
          onClick={item.incrementQty}
          color="primary"
          size="sm"
          data-testid={`add-${item.product.id}`}
        >
          +
        </Button>
      </td>
      <td className="text-right text-xl">{item.totalPrice}</td>
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

export default inject('cart')(observer(CartTableItem));
