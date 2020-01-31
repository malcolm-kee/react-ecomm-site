import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Jumbotron } from '../components/jumbotron';
import { Spinner } from '../components/spinner';
import { useWindowEvent } from '../hooks/use-window-event';
import { MarketingBanner } from '../modules/marketing/components/marketing-banner';
import { ProductBox } from '../modules/products/components/product-box';
import { loadProducts } from '../modules/products/product.actions';
import {
  selectHasMoreProduct,
  selectProductIsLoading,
  selectProducts,
} from '../modules/products/product.selectors';
import { RootState } from '../type';
import styles from './main-page.module.scss';

type ReduxProps = ConnectedProps<typeof connector>;

function MainPageContent({
  loadProducts,
  products,
  hasMoreProduct,
  isLoading,
}: ReduxProps) {
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

const mapStates = (state: RootState) => ({
  products: selectProducts(state),
  hasMoreProduct: selectHasMoreProduct(state),
  isLoading: selectProductIsLoading(state),
});

const mapDispatch = {
  loadProducts,
};

const connector = connect(mapStates, mapDispatch);

export const MainPage = connector(MainPageContent);
