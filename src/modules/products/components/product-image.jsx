import React from 'react';
import { Image } from '../../../components/image';

function getImageUrl(url) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}

export function ProductImage({ url, webpUrl, blurUrl, ...props }) {
  return (
    <Image
      src={getImageUrl(url)}
      webpSrc={getImageUrl(webpUrl)}
      blurSrc={blurUrl && getImageUrl(blurUrl)}
      {...props}
    />
  );
}
