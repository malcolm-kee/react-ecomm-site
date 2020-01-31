import { inject, observer } from 'mobx-react';
import React from 'react';
import { Jumbotron } from '../components/jumbotron';
import { Spinner } from '../components/spinner';
import { useWindowEvent } from '../hooks/use-window-event';
import { MarketingBanner } from '../modules/marketing/components/marketing-banner';
import { ProductBox } from '../modules/products/components/product-box';
import styles from './main-page.module.scss';

function MainPageContent({
  loadProducts,
  products,
  hasMoreProduct,
  isLoading,
}) {
  React.useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [loadProducts, products.length]);

  useWindowEvent(
    'scroll',
    () => {
      if (
        hasMoreProduct &&
        window.innerHeight + window.scrollY > document.body.clientHeight - 300
      ) {
        if (!isLoading) {
          loadProducts();
        }
      }
    },
    { wait: 200 }
  );

  return (
    <>
      <div className="hidden sm:block">
        <MarketingBanner />
      </div>
      <div>
        <Jumbotron title="Shopit">
          <blockquote>
            <p>
              The best shopping site in the web that would saves you most money.
            </p>
            <small>Because you can't buy anything here.</small>
          </blockquote>
        </Jumbotron>
        <div className={styles.grid}>
          {products.map(product => (
            <ProductBox {...product} key={product.id} />
          ))}
        </div>
        <div>{hasMoreProduct && <Spinner />}</div>
      </div>
    </>
  );
}

export const MainPage = inject('product')(
  observer(function MainPage({
    product: { products, hasMore, loadingProducts, loadProducts },
  }) {
    return (
      <MainPageContent
        products={products}
        hasMoreProduct={hasMore}
        isLoading={loadingProducts}
        loadProducts={loadProducts}
      />
    );
  })
);
