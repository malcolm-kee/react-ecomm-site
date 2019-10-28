import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, ThunkDispatch } from '../../../type';
import { loadProductDetail } from '../product.actions';
import { selectProduct } from '../product.selectors';
import { ProductBox } from './product-box';

type ProductBoxContainerProps = {
  productId: number;
};

type ReduxProps = ConnectedProps<typeof connector>;

function ProductBoxContainerContent({
  productId,
  productDetails,
  loadDetails
}: ProductBoxContainerProps & ReduxProps) {
  React.useEffect(() => {
    if (!productDetails) {
      loadDetails();
    }
  }, [productId, productDetails, loadDetails]);

  return productDetails ? <ProductBox {...productDetails} /> : null;
}

const mapStates = (state: RootState, ownProps: ProductBoxContainerProps) => ({
  productDetails: selectProduct(state, ownProps.productId)
});

const mapDispatch = (
  dispatch: ThunkDispatch,
  ownProps: ProductBoxContainerProps
) => ({
  loadDetails: () => dispatch(loadProductDetail(ownProps.productId))
});

const connector = connect(
  mapStates,
  mapDispatch
);

export const ProductBoxContainer = connector(ProductBoxContainerContent);
