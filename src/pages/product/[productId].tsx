import { Button } from 'components/button';
import { Field } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { ShareButton } from 'components/share-button';
import { Spinner } from 'components/spinner';
import { toast } from 'components/toast';
import { cartActions } from 'modules/cart/cart.slice';
import { ProductBoxContainer } from 'modules/products/components/product-box-container';
import { ProductComments } from 'modules/products/components/product-comments';
import { ProductImage } from 'modules/products/components/product-image';
import { useProductDetails } from 'modules/products/product.queries';
import { Product } from 'modules/products/product.type';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'type';

function useQty(productId: number) {
  const [qty, setQty] = React.useState(1);

  // reset qty when product id change
  React.useEffect(() => {
    setQty(1);
  }, [productId]);

  return {
    qty,
    increment: () => setQty((q) => q + 1),
    decrement: () => setQty((q) => q - 1),
  };
}

type ReduxProps = ConnectedProps<typeof connector>;

function ProductPageContent({ addToCart }: ReduxProps) {
  const { query } = useRouter();
  const productId = Number(query.productId);

  const { data: details } = useProductDetails(productId);

  const { qty, increment, decrement } = useQty(productId);

  return (
    <article className="max-w-4xl mx-auto py-2 px-4">
      {details ? (
        <>
          <Head>
            <title>
              {details.name}{' '}
              {details.descriptions && `- ${details.descriptions.join(', ')}`}
            </title>
          </Head>
          <h1 className="sm:hidden text-3xl">{details.name}</h1>
          <div className="sm:flex mb-4 pb-2 border-b border-gray-300">
            {details.images && (
              <div className="w-full sm:w-1/2 lg:w-5/12">
                <ProductImage
                  url={details.images.standard}
                  webpUrl={details.images.webp}
                  blurUrl={details.images.blur}
                  alt={details.name}
                  key={details.images.standard}
                />
              </div>
            )}
            <div className="w-full sm:w-1/2 sm:px-4">
              <h1 className="hidden sm:block text-3xl md:text-4xl">
                {details.name}
              </h1>
              {details.price && (
                <h3 className="text-3xl sm:text-xl md:text-2xl">
                  RM {details.price}
                </h3>
              )}
              {details.descriptions && details.descriptions.length > 0 && (
                <blockquote>{details.descriptions.join(', ')}</blockquote>
              )}
              <div>
                <Field>
                  <Label>Quantity</Label>
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
                    className="mx-1 sm:mx-2 flex-shrink-0 w-40"
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
              <ProductComments productId={productId} />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </article>
  );
}

const connector = connect(null, (dispatch: ThunkDispatch) => ({
  addToCart: (qty: number, product: Product) => {
    toast('Added to Cart', {
      type: 'success',
      autoClose: 2000,
    });
    return dispatch(cartActions.addItem({ product, qty }));
  },
}));

export default connector(ProductPageContent);
