import React from 'react';
import { MarketingBanner } from '../marketing.type';
import styles from './marketing-image.module.scss';

type MarketingImageProps = {
  banner: MarketingBanner;
  onLoad: () => void;
};

export function MarketingImage({ banner, onLoad }: MarketingImageProps) {
  const hasBlurVersion = typeof banner['700Blur'] === 'string';

  const [loadingBlur, setIsLoading] = React.useState(hasBlurVersion);

  function onImageLoaded() {
    setIsLoading(false);
  }

  return loadingBlur ? (
    <img
      className={`image-blur ${styles.img}`}
      onLoad={onImageLoaded}
      onError={onImageLoaded}
      srcSet={`${banner['500Blur']} 500w, ${banner['700Blur']} 700w, ${banner['1242Blur']} 1242w, ${banner['2500Blur']} 2500w`}
      src={banner['700Blur']}
      alt=""
      loading="lazy"
      width="700"
      height="350"
    />
  ) : (
    <img
      srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w, ${banner['2500']} 2500w`}
      src={banner['700']}
      onLoad={onLoad}
      className={styles.img}
      width="700"
      height="350"
      alt=""
    />
  );
}
