import React from 'react';
import { Jumbotron } from '../components/jumbotron';

export function MainPage() {
  return (
    <div>
      <div className="container">
        <h1>Shopit</h1>
        <p>
          The best shopping site in the web that would saves you most money.
        </p>
        <p>Because you can't buy anything here.</p>
        <Jumbotron>
          <p>It's only crazy until you buy it.</p>
          <h1>Just Buy It.</h1>
          <p>Show them what a crazy can do.</p>
        </Jumbotron>
      </div>
    </div>
  );
}
