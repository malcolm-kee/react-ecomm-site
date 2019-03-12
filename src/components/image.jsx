import React from 'react';
import { Spinner } from './spinner';
import './image.css';

export function Image({ src, webpSrc, alt, width, height, ...props }) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="image">
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
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={src} type="image/jpeg" />
        <img
          onLoad={() => isLoading && setIsLoading(false)}
          alt={alt}
          src={src}
          {...props}
        />
      </picture>
    </div>
  );
}
