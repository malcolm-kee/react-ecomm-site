import { AppProps } from 'next/app';
import * as React from 'react';
import 'react-credit-cards/lib/styles.scss';
import { ReactQueryConfigProvider } from 'react-query';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import { Footer } from '../components/footer';
import { MainContent } from '../components/main-content';
import { SiteNav } from '../components/site-nav';
import { ToastContainer } from '../components/toast';
import '../global.scss';
import { LayoutContext, LayoutType } from '../hooks/use-layout';
import { initAuthStatus } from '../modules/auth/auth.actions';
import { ChatLauncher } from '../modules/auth/components/chat-launcher';
import { wrapper } from '../modules/store';

const reactQueryConfig = {
  staleTime: 5000,
};

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initAuthStatus());
  }, [dispatch]);

  const layoutContextValue = React.useState<LayoutType>('default');
  const layoutType = layoutContextValue[0];

  return (
    <ReactQueryConfigProvider config={reactQueryConfig}>
      <LayoutContext.Provider value={layoutContextValue}>
        {layoutType === 'default' && <SiteNav />}
        <MainContent>
          <Component {...pageProps} />
        </MainContent>
        {layoutType === 'default' && (
          <>
            <ChatLauncher />
            <Footer />
          </>
        )}
        <ToastContainer hideProgressBar />
      </LayoutContext.Provider>
    </ReactQueryConfigProvider>
  );
}

export default wrapper.withRedux(App);
