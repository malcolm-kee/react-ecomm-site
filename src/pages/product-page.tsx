import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../components/button';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { ShareButton } from '../components/share-button';
import { Spinner } from '../components/spinner';
import { addProductToCart } from '../modules/cart/cart.actions';
import { ProductBoxContainer } from '../modules/products/components/product-box-container';
import { ProductImage } from '../modules/products/components/product-image';
import { loadProductDetail } from '../modules/products/product.actions';
import { selectProduct } from '../modules/products/product.selectors';
import { RootState, ThunkDispatch } from '../type';
import './product-page.css';

const ProductComments = React.lazy(() =>
  import(
    /* webpackChunkName: "ProductComments" */ '../modules/products/components/product-comments'
  )
);

function useQty(productId: number) {
  const [qty, setQty] = React.useState(1);

  // reset qty when product id change
  React.useEffect(() => {
    setQty(1);
  }, [productId]);

  return {
    qty,
    increment: () => setQty(q => q + 1),
    decrement: () => setQty(q => q - 1),
  };
}

type ProductPageProps = {
  productId: number;
} & RouteComponentProps;

type ReduxProps = ConnectedProps<typeof connector>;

function ProductPageContent({
  productId,
  details,
  loadDetails,
  addToCart,
  location,
}: ProductPageProps & ReduxProps) {
  React.useEffect(() => {
    if (!details) {
      loadDetails();
    }
  }, [productId, details, loadDetails]);

  const { qty, increment, decrement } = useQty(productId);

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
                  blurUrl={details.images.blur}
                  alt={details.name}
                  key={details.images.standard}
                />
              </div>
            )}
            <div className="col-lg-7 col-sm-6 col-xs-12">
              <h1 className="visible-sm visible-md visible-lg">
                {details.name}
              </h1>
              {details.price && <h3>RM {details.price}</h3>}
              {details.descriptions && details.descriptions.length > 0 && (
                <blockquote>{details.descriptions.join(', ')}</blockquote>
              )}
              <div>
                <Field>
                  <Label>Quantity</Label>
                  <div className="input-group">
                    <div className="input-group-btn">
                      <Button
                        onClick={decrement}
                        disabled={qty === 1}
                        color="default"
                        data-testid="reduce-qty-btn"
                      >
                        -
                      </Button>
                    </div>
                    <Input type="number" value={qty} readOnly />
                    <div className="input-group-btn">
                      <Button
                        onClick={increment}
                        color="default"
                        data-testid="add-qty-btn"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Field>
              </div>
              <div className="btn-toolbar">
                <Button
                  onClick={() => addToCart(qty)}
                  color="success"
                  size="lg"
                >
                  Add To Cart
                </Button>
                {location && (
                  <ShareButton
                    urlToShare={location.href}
                    titleToShare={details.name}
                    size="lg"
                  />
                )}
              </div>
            </div>
          </div>
          {details.related && details.related.length > 0 && (
            <div className="row">
              <div className="col-xs-12">
                <h2 className="h3">Related Products</h2>
                <div className="product-page-related-products">
                  {details.related.map(productId => (
                    <ProductBoxContainer
                      productId={productId}
                      key={productId}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12">
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

const mapStates = (state: RootState, ownProps: ProductPageProps) => ({
  details: selectProduct(state, ownProps.productId),
});

const mapDispatch = (dispatch: ThunkDispatch, ownProps: ProductPageProps) => ({
  loadDetails: () => dispatch(loadProductDetail(ownProps.productId)),
  addToCart: (qty: number) => {
    toast('Added to Cart', {
      type: 'success',
      autoClose: 2000,
    });
    return dispatch(addProductToCart(ownProps.productId, qty));
  },
});

const connector = connect(mapStates, mapDispatch);

export const ProductPage = connector(ProductPageContent);
