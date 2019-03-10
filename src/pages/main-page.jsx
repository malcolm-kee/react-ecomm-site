import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from '../components/jumbotron';
import { ProductBox } from '../components/product-box';
import { Spinner } from '../components/spinner';
import { loadProducts } from '../modules/products/product.actions';
import {
  selectProducts,
  selectHasMoreProduct
} from '../modules/products/product.selectors';
import { useWindowEvent } from '../hooks/use-window-event';
import './main-page.css';

function MainPageContent({ loadProducts, products, hasMoreProduct }) {
  const isLoading = React.useRef(false);

  React.useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, []);

  useWindowEvent(
    'scroll',
    () => {
      if (
        hasMoreProduct &&
        window.innerHeight + window.scrollY > document.body.clientHeight - 300
      ) {
        if (!isLoading.current) {
          isLoading.current = true;
          loadProducts().then(() => (isLoading.current = false));
        }
      }
    },
    { wait: 200 }
  );

  return (
    <div>
      <div className="container">
        <h1>Shopit</h1>
        <blockquote>
          <p>
            The best shopping site in the web that would saves you most money.
          </p>
          <small>Because you can't buy anything here.</small>
        </blockquote>
        <Jumbotron>
          <p>It's only crazy until you buy it.</p>
          <h1>Just Buy It.</h1>
          <p>Show them what a crazy can do.</p>
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
  hasMoreProduct: selectHasMoreProduct(state)
});

const mapDispatch = {
  loadProducts
};

export const MainPage = connect(
  mapStates,
  mapDispatch
)(MainPageContent);
