import React from 'react';
import './product-box.css';

function getImageUrl(url) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}

function ProductImage({ url, webpUrl, alt, ...props }) {
  return (
    <div className="product-image">
      <picture>
        <source srcSet={getImageUrl(webpUrl)} type="image/webp" />
        <source srcSet={getImageUrl(url)} type="image/jpeg" />
        <img alt={alt} src={getImageUrl(url)} {...props} />
      </picture>
    </div>
  );
}

export function ProductBox({ name, images, descriptions }) {
  return (
    <div className="panel panel-default product-box">
      <div className="panel-heading product-box-name">{name}</div>
      <div className="panel-body product-box-body">
        {images && images['thumb-standard'] && (
          <ProductImage
            url={images['thumb-standard']}
            webpUrl={images['thumb-webp']}
            alt={name}
          />
        )}
        {descriptions && descriptions.length > 0 && (
          <p>{descriptions.join(', ')}</p>
        )}
      </div>
    </div>
  );
}
