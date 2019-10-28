import React from 'react';
import './image.css';
import { Spinner } from './spinner';

export type ImageProps = Omit<JSX.IntrinsicElements['img'], 'src' | 'alt'> & {
  /**
   * Src for the standard image, in jpeg format
   */
  src: string;
  /**
   * Description for the image, important for accessibility
   */
  alt: string;
  /**
   * Src for the webp version of the image
   */
  webpSrc?: string;
  /**
   * Src for the blur version of the image.
   * If this is available, it will be loaded before the image at `src` is loaded
   */
  blurSrc?: string;
};

/**
 * Image is a component that allows you to specify image with its standard format (jpg/png/gif)
 * and webp format. It will fallback to use the standard format if browser doesn't support webp.
 */
export function Image({
  src,
  webpSrc,
  blurSrc,
  alt,
  width,
  height,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  function onImageLoaded() {
    if (isLoading) {
      setIsLoading(false);
    }
  }

  return (
    <div className="image">
      {isLoading && (
        <div className="image-spinner-container">
          <Spinner />
        </div>
      )}
      {blurSrc && (
        <img
          className="image-blur"
          onLoad={onImageLoaded}
          onError={onImageLoaded}
          src={blurSrc}
          alt={alt}
          loading="lazy"
        />
      )}
      {(!blurSrc || !isLoading) && ( // show the fulll image if not blur image or blur image is loaded
        <picture onLoad={onImageLoaded} onError={onImageLoaded}>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <source srcSet={src} type="image/jpeg" />
          <img
            onLoad={onImageLoaded}
            alt={alt}
            src={src}
            loading="lazy"
            {...props}
          />
        </picture>
      )}
    </div>
  );
}
