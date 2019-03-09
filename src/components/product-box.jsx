import React from 'react';
import { Spinner } from './spinner';
import './product-box.css';

function getImageUrl(url) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}

function ProductImage({ url, webpUrl, alt, ...props }) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="product-image">
      {isLoading && (
        <div
          style={{
            width: 188,
            height: 188,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner />
        </div>
      )}
      <picture onLoad={() => isLoading && setIsLoading(false)}>
        <source srcSet={getImageUrl(webpUrl)} type="image/webp" />
        <source srcSet={getImageUrl(url)} type="image/jpeg" />
        <img
          onLoad={() => isLoading && setIsLoading(false)}
          alt={alt}
          src={getImageUrl(url)}
          {...props}
        />
      </picture>
    </div>
  );
}

export function ProductBox({ name, images, descriptions }) {
  return (
    <div className="panel panel-default product-box">
      <div className="panel-heading product-box-name">{name}</div>
      <div className="panel-body product-box-body">
        {images && (
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
