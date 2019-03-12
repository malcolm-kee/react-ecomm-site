import { Link } from '@reach/router';
import React from 'react';
import { ProductImage } from './product-image';
import './product-box.css';

export function ProductBox({ id, name, images, descriptions }) {
  return (
    <Link to={`/product/${id}`} className="panel panel-default product-box">
      <div className="panel-heading product-box-name">{name}</div>
      <div className="panel-body product-box-body">
        {images && (
          <ProductImage
            url={images['thumb-standard']}
            webpUrl={images['thumb-webp']}
            alt={name}
            width={188}
            height={188}
          />
        )}
        {descriptions && descriptions.length > 0 && (
          <div className="product-box-desc">
            <p>{descriptions.join(', ')}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
