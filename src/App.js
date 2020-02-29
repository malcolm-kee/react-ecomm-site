// import DevTools from 'mobx-react-devtools';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route
            path="/product/:productId"
            render={({ match, location }) => (
              <ProductPage
                productId={match.params.productId}
                location={location}
              />
            )}
          />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/help" component={HelpPage} />
          <Route path="/" exact component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MainContent>
      <Footer />
      {/* <DevTools /> */}
      <ChatLauncher />
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default App;
