import React from 'react';
import { Image } from '../../../components/image';

function getImageUrl(url) {
  return `https://ecomm-db.herokuapp.com/images/${url}`;
}

export function ProductImage({ url, webpUrl, ...props }) {
  return (
    <Image src={getImageUrl(url)} webpSrc={getImageUrl(webpUrl)} {...props} />
  );
}
