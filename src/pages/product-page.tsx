import { Button } from 'components/button';
import { ErrorBoundary } from 'components/error-boundary';
import { Field } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Seo } from 'components/seo';
import { ShareButton } from 'components/share-button';
import { Spinner } from 'components/spinner';
import { toast } from 'components/toast';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { cartActions } from '../modules/cart/cart.slice';
import { ProductBoxContainer } from '../modules/products/components/product-box-container';
import { ProductImage } from '../modules/products/components/product-image';
import { useProductDetails } from '../modules/products/product.queries';
import { Product } from '../modules/products/product.type';
import { ThunkDispatch } from '../type';

const ProductComments = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ProductComments" */ '../modules/products/components/product-comments'
    )
);

function useQty() {
  const [qty, setQty] = React.useState(1);

  return {
    qty,
    increment: () => setQty((q) => q + 1),
    decrement: () => setQty((q) => q - 1),
  };
}

type ProductPageProps = {
  productId: string;
};

type ReduxProps = ConnectedProps<typeof connector>;

function ProductDetails({
  productId,
  addToCart,
}: ProductPageProps & ReduxProps) {
  const { data: details } = useProductDetails(productId);

  const { qty, increment, decrement } = useQty();

  return (
    <article className="max-w-4xl mx-auto py-2 px-4">
      {details ? (
        <>
          <Seo
            title={`${details.name} ${
              details.descriptions && `- ${details.descriptions.join(', ')}`
            }`}
          />
          <h1 className="sm:hidden text-3xl">{details.name}</h1>
          <div className="sm:flex mb-4 pb-2 border-b border-gray-300">
            {details.images && (
              <div className="w-full sm:w-1/2 lg:w-5/12">
                <ProductImage
                  url={details.images.standard}
                  webpUrl={details.images.webp}
                  blurUrl={details.images.blur}
                  blurhash={details.blurhash}
                  alt={details.name}
                  key={details.images.standard}
                  className="rounded-lg"
                />
              </div>
            )}
            <div className="w-full sm:w-1/2 sm:px-4">
              <h1 className="hidden sm:block text-3xl">{details.name}</h1>
              {details.price && (
                <h3 className="text-3xl sm:text-xl md:text-2xl">
                  RM {details.price}
                </h3>
              )}
              {details.descriptions && details.descriptions.length > 0 && (
                <blockquote className="text-gray-700">
                  {details.descriptions.join(', ')}
                </blockquote>
              )}
              <div>
                <Field className="flex items-center my-2">
                  <Label className="mr-2">Quantity</Label>
                  <div className="flex py-1 w-32">
                    <Button
                      onClick={decrement}
                      disabled={qty === 1}
                      color="default"
                      data-testid="reduce-qty-btn"
                    >
                      -
                    </Button>
                    <Input type="number" value={qty} readOnly rounded={false} />
                    <Button
                      onClick={increment}
                      color="default"
                      data-testid="add-qty-btn"
                    >
                      +
                    </Button>
                  </div>
                </Field>
              </div>
              <div>
                <Button
                  onClick={() => addToCart(qty, details)}
                  color="success"
                  size="lg"
                  className="mr-2"
                >
                  Add To Cart
                </Button>
                {window && window.location && (
                  <ShareButton
                    urlToShare={window.location.href}
                    titleToShare={details.name}
                    size="lg"
                  />
                )}
              </div>
            </div>
          </div>
          {details.related && details.related.length > 0 && (
            <aside className="mb-4 pb-2 border-b border-gray-300">
              <h2 className="mb-2 text-gray-700">Related Products</h2>
              <div className="overflow-y-auto py-1 flex -mx-1 sm:-mx-2">
                {details.related.map((productId) => (
                  <ProductBoxContainer
                    className="flex-shrink-0 w-40"
                    productId={productId}
                    key={productId}
                  />
                ))}
              </div>
            </aside>
          )}
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-gray-700 mb-2">Reviews</h2>
              <React.Suspense fallback={<Spinner />}>
                <ErrorBoundary>
                  <ProductComments
                    productId={productId}
                    comments={details.comments}
                  />
                </ErrorBoundary>
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

function ProductPageContent(props: ProductPageProps & ReduxProps) {
  return <ProductDetails {...props} key={props.productId} />;
}

const connector = connect(null, (dispatch: ThunkDispatch) => ({
  addToCart: (qty: number, product: Product) => {
    toast.success('Added to Cart', {
      autoClose: 2000,
    });
    return dispatch(cartActions.addItem({ product, qty }));
  },
}));

export const ProductPage = connector(ProductPageContent);
