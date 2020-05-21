import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ProductBox } from './product-box';

function ProductBoxContainerContent({
  productId,
  productDetails,
  loadDetails,
  className,
}) {
  React.useEffect(() => {
    if (!productDetails) {
      loadDetails(productId);
    }
  }, [productId, productDetails, loadDetails]);

  return productDetails ? (
    <ProductBox className={className} {...productDetails} />
  ) : null;
}

export const ProductBoxContainer = inject('product')(
  observer(function ProductBoxContainer({ product, productId, className }) {
    return (
      <ProductBoxContainerContent
        productId={productId}
        productDetails={product.getProduct(productId)}
        loadDetails={product.loadProductDetail}
        className={className}
      />
    );
  })
);
