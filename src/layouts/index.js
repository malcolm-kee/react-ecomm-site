import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import React from 'react';
// import DevTools from 'mobx-react-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from '../components/footer';
import { AuthStore } from '../modules/auth/auth.store';
import { CartStore } from '../modules/cart/cart.store';
import { MarketingStore } from '../modules/marketing/marketing.store';
import { ProductStore } from '../modules/products/product.store';
import { SiteNav } from '../site-nav';

configure({
  enforceActions: 'observed',
});

const authStore = new AuthStore();
const productStore = new ProductStore();
const cartStore = new CartStore(productStore);
const marketingStore = new MarketingStore();

function Layout({ children }) {
  React.useEffect(() => {
    authStore.init();
  }, []);

  return (
    <Provider
      auth={authStore}
      product={productStore}
      cart={cartStore}
      marketing={marketingStore}
    >
      <div>
        <SiteNav />
        {children}
        <Footer />
        {/* <DevTools /> */}
        <ToastContainer hideProgressBar />
      </div>
    </Provider>
  );
}

export default Layout;
