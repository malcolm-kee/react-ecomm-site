import * as React from 'react';
import { useProductDetails } from '../product.queries';
import { ProductBox } from './product-box';

export function ProductBoxContainer({ productId, className }) {
  const { data } = useProductDetails(productId);

  return data ? <ProductBox className={className} {...data} /> : null;
}
