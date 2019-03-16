import { Link } from '@reach/router';
import React from 'react';
import { ProductImage } from './product-image';
import './product-box.css';

export function ProductBox({ id, name, images, price }) {
  return (
    <Link to={`/product/${id}`} className="panel panel-default product-box">
      <div className="panel-heading product-box-name">{name}</div>
      <div className="panel-body product-box-body">
        {images ? (
          <ProductImage
            url={images.thumbStandard}
            webpUrl={images.thumbWebp}
            blurUrl={images.thumbBlur}
            alt={name}
            width={188}
            height={188}
          />
        ) : (
          <div className="product-image-placeholder" />
        )}
        {price && (
          <div className="product-box-desc">
            <p>RM {price}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
