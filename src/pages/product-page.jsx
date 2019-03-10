import React from 'react';
import { connect } from 'react-redux';
import { ProductImage } from '../components/product-image';
import { Spinner } from '../components/spinner';
import { loadProductDetail } from '../modules/products/product.actions';
import { selectProduct } from '../modules/products/product.selectors';
import './product-page.css';

const ProductComments = React.lazy(() =>
  import(/* webpackChunkName: "ProductComments" */ '../components/product-comments')
);

function ProductPageContent({ productId, details, loadDetails }) {
  React.useEffect(() => {
    if (!details) {
      loadDetails();
    }
  }, [productId, details]);

  return (
    <article className="container">
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
              <div>
                <button className="btn btn-success btn-lg" type="button">
                  Add to Cart
                </button>
              </div>
              <h2 className="h3">Reviews</h2>
              <React.Suspense fallback={<Spinner />}>
                <ProductComments productId={productId} />
              </React.Suspense>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </article>
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
