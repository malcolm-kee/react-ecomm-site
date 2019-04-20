import { inject, observer } from 'mobx-react';
import React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/button';
import { Spinner } from '../components/spinner';
import { ProductBoxContainer } from '../modules/products/components/product-box-container';
import { ProductImage } from '../modules/products/components/product-image';
import './product-page.css';

const ProductComments = React.lazy(() =>
  import(/* webpackChunkName: "ProductComments" */ '../modules/products/components/product-comments')
);

function ProductPageContent({ productId, details, loadDetails, addToCart }) {
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
                <Button
                  onClick={() => addToCart(details)}
                  color="success"
                  size="lg"
                >
                  Add To Cart
                </Button>
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

export const ProductPage = inject('product', 'cart')(
  observer(function ProductPage({
    product: { loadProductDetail, getProduct },
    cart: { addItem },
    productId: productIdVal
  }) {
    const productId = Number(productIdVal);
    const product = getProduct(productId);
    return (
      <ProductPageContent
        productId={productId}
        details={product}
        loadDetails={() => loadProductDetail(productId)}
        addToCart={() => {
          toast('Added to Cart', {
            type: 'success',
            autoClose: 2000
          });
          addItem(productId);
        }}
      />
    );
  })
);
