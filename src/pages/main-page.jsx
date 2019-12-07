import React from 'react';
import { connect } from 'react-redux';
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
import './main-page.css';

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
    <div>
      <div className="hidden-xs">
        <MarketingBanner />
      </div>
      <div className="container-fluid">
        <Jumbotron>
          <h1>Shopit</h1>
          <blockquote>
            <p>
              The best shopping site in the web that would saves you most money.
            </p>
            <small>Because you can't buy anything here.</small>
          </blockquote>
        </Jumbotron>
        <div className="main-page-product-grid">
          {products.map(product => (
            <ProductBox {...product} key={product.id} />
          ))}
        </div>
        <div>{hasMoreProduct && <Spinner />}</div>
      </div>
    </div>
  );
}

const mapStates = state => ({
  products: selectProducts(state),
  hasMoreProduct: selectHasMoreProduct(state),
  isLoading: selectProductIsLoading(state),
});

const mapDispatch = {
  loadProducts,
};

export const MainPage = connect(mapStates, mapDispatch)(MainPageContent);
