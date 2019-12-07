import React from 'react';
import { Image, ImageProps } from '../../../components/image';

export type ProductImageProps = Omit<
  ImageProps,
  'src' | 'webpSrc' | 'blurSrc'
> & {
  url: string;
  webpUrl: string;
  blurUrl?: string;
};

export function ProductImage({
  url,
  webpUrl,
  blurUrl,
  ...props
}: ProductImageProps) {
  return <Image src={url} webpSrc={webpUrl} blurSrc={blurUrl} {...props} />;
}
