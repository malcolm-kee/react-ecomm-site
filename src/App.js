import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from './components/footer';
import { MainContent } from './components/main-content';
import { initAuthStatus } from './modules/auth/auth.actions';
import { ChatLauncher } from './modules/auth/components/chat-launcher';
import { CareersPage } from './pages/careers';
import { CartPage } from './pages/cart-page';
import { HelpPage } from './pages/help-page';
import { Login } from './pages/login';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';
import { Signup } from './pages/signup';
import { SiteNav } from './site-nav';

function AppContainer({ initAuthStatus }) {
  React.useEffect(() => {
    initAuthStatus();
  }, [initAuthStatus]);

  return (
    <div>
      <SiteNav />
      <MainContent>
        <Switch>
          <Route
            path="/product/:productId"
            render={({ match }) => (
              <ProductPage
                productId={Number(match.params && match.params.productId)}
              />
            )}
          />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/help" component={HelpPage} />
          <Route path="/" exact component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MainContent>
      <Footer />
      <ChatLauncher />
      <ToastContainer hideProgressBar />
    </div>
  );
}

const App = connect(null, {
  initAuthStatus,
})(AppContainer);

export default App;
