import { inject, observer } from 'mobx-react';
import React from 'react';
import { ProductBox } from './product-box';

function ProductBoxContainerContent({
  productId,
  productDetails,
  loadDetails
}) {
  React.useEffect(() => {
    if (!productDetails) {
      loadDetails();
    }
  }, [productId, productDetails]);

  return productDetails ? <ProductBox {...productDetails} /> : null;
}

export const ProductBoxContainer = inject('product')(
  observer(function ProductBoxContainer({ product, productId }) {
    return (
      <ProductBoxContainerContent
        productDetails={product.getProduct(productId)}
        loadDetails={() => product.loadProductDetail(productId)}
      />
    );
  })
);
