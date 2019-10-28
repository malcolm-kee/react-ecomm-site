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
  return (
    <Image
      src={getImageUrl(url)}
      webpSrc={getImageUrl(webpUrl)}
      blurSrc={blurUrl && getImageUrl(blurUrl)}
      {...props}
    />
  );
}

function getImageUrl(url: string) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}
