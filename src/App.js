import { Router } from '@reach/router';
import React from 'react';
import { Navbar } from './components/navbar';
import { MainPage } from './pages/main-page';
import { ProfilePage } from './pages/profile-page';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <MainPage path="/" />
        <ProfilePage path="/profile" />
      </Router>
    </div>
  );
}

export default App;
