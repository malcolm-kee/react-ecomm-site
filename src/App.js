import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import { Navbar } from './components/navbar';
import { MainPage } from './pages/main-page';
import { ProfilePage } from './pages/profile-page';
import { configureStore } from './config/configure-store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Router>
          <MainPage path="/" />
          <ProfilePage path="/profile" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
