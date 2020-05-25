import * as React from 'react';
import styles from './image.module.scss';
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

type Status = 'initializing' | 'loadingFullImage' | 'loaded' | 'error';

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
  const [loadStatus, setLoadStatus] = React.useState<Status>(
    blurSrc ? 'initializing' : 'loadingFullImage'
  );

  return (
    <div className={styles.image}>
      {loadStatus === 'initializing' && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {blurSrc && (
        <img
          className={styles.blur}
          onLoad={() => setLoadStatus('loadingFullImage')}
          onError={() => setLoadStatus('error')}
          src={blurSrc}
          alt={alt}
          loading="lazy"
          {...props}
        />
      )}
      {(loadStatus === 'loadingFullImage' || loadStatus === 'loaded') && ( // show the full image if not blur image or blur image is loaded
        <picture
          onLoad={() => setLoadStatus('loaded')}
          onError={() => setLoadStatus('error')}
        >
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <source srcSet={src} type="image/jpeg" />
          <img
            onLoad={() => setLoadStatus('loaded')}
            onError={() => setLoadStatus('error')}
            alt={alt}
            src={src}
            loading="lazy"
            {...props}
          />
        </picture>
      )}
      {loadStatus === 'error' && (
        <b className={`text-danger ${styles.error}`}>Fail to load</b>
      )}
    </div>
  );
}
