import React from 'react';
import './footer.css';

const currentYear = new Date().getFullYear();

/**
 * Footer is used to put at the bottom of the page
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <small>
          &copy; Copyright {currentYear} Shopit. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
