import React from 'react';
import { Image } from '../../../components/image';

export function ProductImage({ url, webpUrl, blurUrl, ...props }) {
  return <Image src={url} webpSrc={webpUrl} blurSrc={blurUrl} {...props} />;
}
