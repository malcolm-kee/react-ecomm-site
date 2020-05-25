import * as React from 'react';
import { MarketingBanner } from '../marketing.type';
import styles from './marketing-image.module.scss';

type MarketingImageProps = {
  banner: MarketingBanner;
  onLoad: () => void;
};

export function MarketingImage({ banner, onLoad }: MarketingImageProps) {
  const [loadingBlur, setIsLoading] = React.useState(
    () => typeof banner['700Blur'] === 'string'
  );

  function onImageLoaded() {
    setIsLoading(false);
  }

  return loadingBlur ? (
    <picture onLoad={onImageLoaded} onError={onImageLoaded}>
      {banner['2500Blur'] && (
        <source media="(min-width: 1200px)" srcSet={banner['2500Blur']} />
      )}
      {banner['1242Blur'] && (
        <source media="(min-width: 700px)" srcSet={banner['1242Blur']} />
      )}
      <img
        className={styles.img}
        onLoad={onImageLoaded}
        onError={onImageLoaded}
        srcSet={`${banner['500Blur']} 500w, ${banner['700Blur']} 700w, ${banner['1242Blur']} 1242w, ${banner['2500Blur']} 2500w`}
        src={banner['700Blur']}
        alt=""
        loading="lazy"
        width="2500"
        height="1000"
      />
    </picture>
  ) : (
    <picture onLoad={onLoad}>
      {banner['2500'] && (
        <source media="(min-width: 1200px)" srcSet={banner['2500']} />
      )}
      {banner['1242'] && (
        <source media="(min-width: 700px)" srcSet={banner['1242']} />
      )}
      <img
        srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w, ${banner['2500']} 2500w`}
        src={banner['700']}
        onLoad={onLoad}
        className={styles.img}
        width="2500"
        height="1000"
        alt=""
      />
    </picture>
  );
}
