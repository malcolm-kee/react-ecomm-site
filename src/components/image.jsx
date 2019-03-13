import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from './spinner';
import './image.css';

/**
 * Image is a component that allows you to specify image with its standard format (jpg/png/gif)
 * and webp format. It will fallback to use the standard format if browser doesn't support webp.
 */
export function Image({ src, webpSrc, alt, width, height, ...props }) {
  const [isLoading, setIsLoading] = React.useState(true);

  function onImageLoad() {
    if (isLoading) {
      setIsLoading(false);
    }
  }

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
      <picture onLoad={onImageLoad}>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={src} type="image/jpeg" />
        <img onLoad={onImageLoad} alt={alt} src={src} {...props} />
      </picture>
    </div>
  );
}

Image.propTypes = {
  /**
   * Src for the standard image, be jpeg format
   */
  src: PropTypes.string.isRequired,
  /**
   * Src for the webp version of the image
   */
  webpSrc: PropTypes.string,
  /**
   * Description for the image, important for accessibility
   */
  alt: PropTypes.string.isRequired
};

export default Image;
