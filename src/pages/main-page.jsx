import React from 'react';
import { Link } from '@reach/router';

export function MainPage() {
  return (
    <div className="App">
      <h1>Shopit</h1>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
