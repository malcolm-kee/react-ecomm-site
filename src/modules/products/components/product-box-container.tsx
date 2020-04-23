import React from 'react';
import { useProductDetails } from '../product.queries';
import { ProductBox } from './product-box';

type ProductBoxContainerProps = {
  productId: number;
  className?: string;
};

export function ProductBoxContainer({
  productId,
  className,
}: ProductBoxContainerProps) {
  const { data } = useProductDetails(productId);

  return data ? <ProductBox className={className} {...data} /> : null;
}
