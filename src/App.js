import { Router } from '@reach/router';
import React from 'react';
// import DevTools from 'mobx-react-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from './components/footer';
import { MainContent } from './components/main-content';
import { ChatLauncher } from './modules/auth/components/chat-launcher';
import { CartPage } from './pages/cart-page';
import { HelpPage } from './pages/help-page';
import { Login } from './pages/login';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';
import { Signup } from './pages/signup';
import { SiteNav } from './site-nav';

function App() {
  return (
    <div>
      <SiteNav />
      <MainContent>
        <Router>
          <MainPage path="/" />
          <ProductPage path="/product/:productId" />
          <ProfilePage path="/profile" />
          <CartPage path="/cart" />
          <Login path="/login" />
          <Signup path="/signup" />
          <HelpPage path="/help/*" />
          <NotFoundPage default />
        </Router>
      </MainContent>
      <Footer />
      {/* <DevTools /> */}
      <ChatLauncher />
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default App;
