import React from 'react';
import { Router } from '@reach/router';
import { MainPage } from './pages/main-page';
import { ProfilePage } from './pages/profile-page';

function App() {
  return (
    <Router>
      <MainPage path="/" />
      <ProfilePage path="/profile" />
    </Router>
  );
}

export default App;
