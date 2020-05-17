import { Image } from 'components/image';
import * as React from 'react';

export function ProductImage({ url, webpUrl, blurUrl, ...props }) {
  return <Image src={url} webpSrc={webpUrl} blurSrc={blurUrl} {...props} />;
}
