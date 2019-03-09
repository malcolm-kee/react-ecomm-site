import React from 'react';
import { Spinner } from './spinner';
import './product-image.css';

function getImageUrl(url) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}

export function ProductImage({ url, webpUrl, alt, width, height, ...props }) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="product-image">
      {isLoading && (
        <div
          style={{
            width,
            height,
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
