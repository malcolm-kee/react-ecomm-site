import { Button } from 'components/button';
import { Field } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { ShareButton } from 'components/share-button';
import { toast } from 'components/toast';
import { useIsClient } from 'hooks/use-is-client';
import fetch from 'isomorphic-unfetch';
import { cartActions } from 'modules/cart/cart.slice';
import { ProductBoxContainer } from 'modules/products/components/product-box-container';
import { ProductComments } from 'modules/products/components/product-comments';
import { ProductImage } from 'modules/products/components/product-image';
import { useProductDetails } from 'modules/products/product.queries';
import { PRODUCT_BASE_URL } from 'modules/products/product.service';
import { Product } from 'modules/products/product.type';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'type';

function useQty() {
  const [qty, setQty] = React.useState(1);

  return {
    qty,
    increment: () => setQty((q) => q + 1),
    decrement: () => setQty((q) => q - 1),
  };
}

type ReduxProps = ConnectedProps<typeof connector>;

type PageProps = {
  product: Product;
};

function ProductPageContent(props: ReduxProps & PageProps) {
  const { qty, increment, decrement } = useQty();

  const { data } = useProductDetails(props.product._id, props.product);

  const product = data as Product;

  const isClient = useIsClient();

  return (
    <article className="max-w-4xl mx-auto py-2 px-4">
      <>
        <Head>
          <title>
            {product.name}{' '}
            {product.descriptions && `- ${product.descriptions.join(', ')}`}
          </title>
        </Head>
        <h1 className="sm:hidden text-3xl">{product.name}</h1>
        <div className="sm:flex mb-4 pb-2 border-b border-gray-300">
          {product.images && (
            <div className="w-full sm:w-1/2 lg:w-5/12">
              <ProductImage
                url={product.images.standard}
                webpUrl={product.images.webp}
                blurUrl={product.images.blur}
                alt={product.name}
                key={product.images.standard}
              />
            </div>
          )}
          <div className="w-full sm:w-1/2 sm:px-4">
            <h1 className="hidden sm:block text-3xl md:text-4xl">
              {product.name}
            </h1>
            {product.price && (
              <h3 className="text-3xl sm:text-xl md:text-2xl">
                RM {product.price}
              </h3>
            )}
            {product.descriptions && product.descriptions.length > 0 && (
              <blockquote>{product.descriptions.join(', ')}</blockquote>
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
                onClick={() => props.addToCart(qty, product)}
                color="success"
                size="lg"
                className="mr-2"
              >
                Add To Cart
              </Button>
              {isClient && (
                <ShareButton
                  urlToShare={globalThis.location.href}
                  titleToShare={product.name}
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
        {product.related && product.related.length > 0 && (
          <aside className="mb-4 pb-2 border-b border-gray-300">
            <h2 className="mb-2 text-gray-700">Related Products</h2>
            <div className="overflow-y-auto py-1 flex -mx-1 sm:-mx-2">
              {product.related.map((productId) => (
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
            <ProductComments
              productId={product._id}
              comments={product.comments}
            />
          </div>
        </div>
      </>
    </article>
  );
}

function ProductPageWrapper(props: ReduxProps & PageProps) {
  return <ProductPageContent {...props} key={props.product._id} />;
}

const requestOptions = {
  headers: {
    Accept: 'application/json',
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = await fetch(
    `${PRODUCT_BASE_URL}?limit=10000`,
    requestOptions
  ).then((res) => res.json());

  return {
    paths: products.map((product) => `/product/${product._id}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  if (!params) {
    throw new Error(`productId is undefined`);
  }
  const product: Product = await fetch(
    `${PRODUCT_BASE_URL}/${params.productId}`,
    requestOptions
  ).then((res) => res.json());

  return {
    props: {
      product,
    },
  };
};

const connector = connect(null, (dispatch: ThunkDispatch) => ({
  addToCart: (qty: number, product: Product) => {
    toast('Added to Cart', {
      type: 'success',
      autoClose: 2000,
    });
    return dispatch(cartActions.addItem({ product, qty }));
  },
}));

export default connector(ProductPageWrapper);
