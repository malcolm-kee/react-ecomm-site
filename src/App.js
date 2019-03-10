import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';
import { configureStore } from './config/configure-store';
import { MainPage } from './pages/main-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';
import { NotFoundPage } from './pages/not-found-page';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Router>
          <MainPage path="/" />
          <ProductPage path="/product/:productId" />
          <ProfilePage path="/profile" />
          <NotFoundPage default />
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
