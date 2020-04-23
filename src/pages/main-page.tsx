import React from 'react';
import { Helmet } from 'react-helmet';
import { Jumbotron } from '../components/jumbotron';
import { Spinner } from '../components/spinner';
import { useWindowEvent } from '../hooks/use-window-event';
import { MarketingBanner } from '../modules/marketing/components/marketing-banner';
import { ProductBox } from '../modules/products/components/product-box';
import { useProducts } from '../modules/products/product.queries';
import styles from './main-page.module.scss';

export function MainPage() {
  const {
    data: productGroups,
    canFetchMore,
    status,
    isFetchingMore,
    fetchMore,
  } = useProducts();

  useWindowEvent(
    'scroll',
    () => {
      if (
        canFetchMore &&
        window.innerHeight + window.scrollY > document.body.clientHeight - 300
      ) {
        if (!isFetchingMore) {
          fetchMore();
        }
      }
    },
    { wait: 200 }
  );

  return (
    <>
      <Helmet>
        <title>Shopit: Save Your Money</title>
      </Helmet>
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
          {productGroups.map((products, i) => (
            <React.Fragment key={i}>
              {products.map((product) => (
                <ProductBox {...product} key={product.id} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div>{(status === 'loading' || isFetchingMore) && <Spinner />}</div>
      </div>
    </>
  );
}
