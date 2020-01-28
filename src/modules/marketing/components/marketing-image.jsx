import React from 'react';

export function MarketingImage({ banner, onLoad }) {
  const hasBlurVersion = typeof banner['700Blur'] === 'string';

  const [loadingBlur, setIsLoading] = React.useState(hasBlurVersion);

  function onImageLoaded() {
    setIsLoading(false);
  }

  return loadingBlur ? (
    <img
      className="image-blur"
      onLoad={onImageLoaded}
      onError={onImageLoaded}
      srcSet={`${banner['500Blur']} 500w, ${banner['700Blur']} 700w, ${banner['1242Blur']} 1242w, ${banner['2500Blur']} 2500w`}
      src={banner['700Blur']}
      alt=""
      loading="lazy"
    />
  ) : (
    <img
      srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w, ${banner['2500']} 2500w`}
      src={banner['700']}
      onLoad={onLoad}
      alt=""
    />
  );
}
