import { Link, Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';
import { configureStore } from './config/configure-store';
import { CartLink } from './modules/cart/components/cart-link';
import { CartPage } from './pages/cart-page';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar>
          <Link className="navbar-brand" to="/">
            Shopit
          </Link>
          <CartLink to="/cart" className="navbar-brand" />
          <Link to="/profile" className="navbar-brand">
            Profile
          </Link>
        </Navbar>
        <Router>
          <MainPage path="/" />
          <ProductPage path="/product/:productId" />
          <ProfilePage path="/profile" />
          <CartPage path="/cart" />
          <NotFoundPage default />
        </Router>
        <Footer />
        <ToastContainer hideProgressBar />
      </div>
    </Provider>
  );
}

export default App;
