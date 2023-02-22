import { decode } from 'blurhash';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './image.module.scss';
import { Spinner } from './spinner';

export type ImageProps = Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'src' | 'alt'
> & {
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
  blurhash?: string;
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
  blurhash,
  style = {},
  ...props
}: ImageProps) {
  const [loadStatus, setLoadStatus] = React.useState<Status>(() =>
    blurhash
      ? 'loadingFullImage'
      : blurSrc
      ? 'initializing'
      : 'loadingFullImage'
  );
  const [ref, inView] = useInView({ rootMargin: '100%' });
  const blurUrl = useBlurhash(
    loadStatus !== 'loaded' && inView ? blurhash : null
  );

  const appliedStyle = blurUrl
    ? {
        ...style,
        backgroundImage: `url("${blurUrl}")`,
        backgroundSize:
          width && height ? `${width}px ${height}px` : '100% 100%',
      }
    : style;

  return (
    <div
      className={`block relative h-0 text-center flex-1 ${styles.image}`}
      ref={ref}
    >
      {loadStatus === 'initializing' && (
        <div className={`absolute ${styles.center}`}>
          <Spinner />
        </div>
      )}
      {!blurhash && blurSrc && loadStatus !== 'loaded' && (
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
            style={appliedStyle}
          />
        </picture>
      )}
      {loadStatus === 'error' && (
        <b className={`text-danger absolute ${styles.center}`}>Fail to load</b>
      )}
    </div>
  );
}

function useBlurhash(
  blurhash: string | undefined | null,
  width = 32,
  height = 32,
  punch = 1
) {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCancelled = false;

    if (!blurhash) return;

    // decode hash
    const pixels = decode(blurhash, width, height, punch);

    // temporary canvas to create a blob from decoded ImageData
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const imageData = context!.createImageData(width, height);
    imageData.data.set(pixels);
    context!.putImageData(imageData, 0, 0);
    canvas.toBlob((blob) => {
      if (blob && !isCancelled) {
        setUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }
          return URL.createObjectURL(blob);
        });
      }
    });

    return function cleanupBlurhash() {
      isCancelled = true;
      setUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        return null;
      });
    };
  }, [blurhash, height, width, punch]);

  return url;
}
