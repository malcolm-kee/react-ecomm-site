import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from './components/footer';
import { configureStore } from './config/configure-store';
import { initAuthStatus } from './modules/auth/auth.actions';
import { CartPage } from './pages/cart-page';
import { Login } from './pages/login';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';
import { Signup } from './pages/signup';
import { SiteNav } from './site-nav';

const store = configureStore();

function App() {
  React.useEffect(() => {
    store.dispatch(initAuthStatus());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <SiteNav />
        <Router>
          <MainPage path="/" />
          <ProductPage path="/product/:productId" />
          <ProfilePage path="/profile" />
          <CartPage path="/cart" />
          <Login path="/login" />
          <Signup path="/signup" />
          <NotFoundPage default />
        </Router>
        <Footer />
        <ToastContainer hideProgressBar />
      </div>
    </Provider>
  );
}

export default App;
