import React from 'react';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <small>
          &copy; Copyright {new Date().getFullYear()} Shopit. All Rights
          Reserved.
        </small>
      </div>
    </footer>
  );
}
