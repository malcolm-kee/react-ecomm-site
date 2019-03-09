import React from 'react';
import { connect } from 'react-redux';
import { loadProductDetail } from '../modules/products/product.actions';
import { selectProduct } from '../modules/products/product.selectors';
import { Spinner } from '../components/spinner';
import { ProductImage } from '../components/product-image';
import './product-page.css';

function ProductPageContent({ details, loadDetails }) {
  React.useEffect(() => {
    if (!details) {
      loadDetails();
    }
  }, [details]);

  return (
    <div className="container">
      {details ? (
        <>
          <h1 className="visible-xs">{details.name}</h1>
          <div className="row">
            {details.images && (
              <div className="col-lg-5 col-sm-6 col-xs-12">
                <ProductImage
                  url={details.images.standard}
                  webpUrl={details.images.webp}
                  alt={details.name}
                  className="product-page-image"
                />
              </div>
            )}
            <div className="col-lg-7 col-sm-6 col-xs-12">
              <h1 className="visible-sm visible-md visible-lg">
                {details.name}
              </h1>
              {details.descriptions && details.descriptions.length > 0 && (
                <blockquote>{details.descriptions.join(', ')}</blockquote>
              )}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

const mapStates = (state, ownProps) => ({
  details: selectProduct(state, ownProps.productId)
});

const mapDispatch = (dispatch, ownProps) => ({
  loadDetails: () => dispatch(loadProductDetail(ownProps.productId))
});

export const ProductPage = connect(
  mapStates,
  mapDispatch
)(ProductPageContent);
