// import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer } from './components/footer';
import { MainContent } from './components/main-content';
import { ToastContainer } from './components/toast';
import { LayoutContext } from './hooks/use-layout';
import { useScrollTopOnNavigate } from './hooks/use-scroll-top-on-navigate';
import { ChatLauncher } from './modules/auth/components/chat-launcher';
import { CareersPage } from './pages/careers';
import { CartPage } from './pages/cart-page';
import { HelpPage } from './pages/help-page';
import { Login } from './pages/login';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { PaymentPage } from './pages/payment-page';
import { ProductPage } from './pages/product-page';
import { ProfilePage } from './pages/profile-page';
import { Signup } from './pages/signup';
import { SiteNav } from './site-nav';

function App() {
  const layoutState = React.useState('default');
  const isDefaultLayout = layoutState[0] === 'default';

  useScrollTopOnNavigate();

  return (
    <LayoutContext.Provider value={layoutState}>
      {isDefaultLayout && <SiteNav />}
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
          <Route path="/careers" component={CareersPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/pay" component={PaymentPage} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/signup" component={Signup} />
          <Route path="/help" component={HelpPage} />
          <Route path="/" exact component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MainContent>
      {isDefaultLayout && (
        <>
          <Footer />
          {/* <DevTools /> */}
          <ChatLauncher />
        </>
      )}
      <ToastContainer hideProgressBar />
    </LayoutContext.Provider>
  );
}

export default App;
