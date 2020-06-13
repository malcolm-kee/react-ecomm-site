import cx from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../product.type';
import { ProductImage } from './product-image';

export function ProductBox({
  _id,
  name,
  images,
  price,
  className,
  department,
}: Product & { className?: string }) {
  return (
    <Link
      className={cx('block p-2 sm:p-4 bg-gray-100', className)}
      to={`/product/${_id}`}
      data-testid="productBox"
    >
      <div>
        <div className="relative rounded overflow-hidden">
          {images ? (
            <ProductImage
              url={images.thumbStandard}
              webpUrl={images.thumbWebp}
              blurUrl={images.thumbBlur}
              alt={name}
              width={188}
              height={188}
              className="object-cover object-center w-full h-full block"
            />
          ) : (
            <div
              style={{
                paddingBottom: '100%',
              }}
              className="w-48 bg-gray-400"
            />
          )}
        </div>
        {price && (
          <div className="mt-4">
            <p className="text-xs text-gray-600 mb-1">{department}</p>
            <p className="text-lg">{name}</p>
            <p className="text-gray-700 mt-1">RM {price}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
