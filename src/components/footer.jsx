import * as React from 'react';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

/**
 * Footer is used to put at the bottom of the page
 */
export function Footer() {
  return (
    <footer className="py-6 mt-4 bg-blue-600 text-gray-100">
      <div className="container mx-auto px-3">
        <ul className="flex flex-wrap">
          <li className="px-2 pb-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 pb-2">
            <Link to="/help">Help</Link>
          </li>
          <li className="px-2 pb-2">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="px-2 pb-2">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li className="px-2 pb-2">
            <Link to="/careers">Careers</Link>
          </li>
          <li className="px-2 pb-2">
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
        <div className="text-right">
          <small>
            &copy; Copyright {currentYear} Shopit. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
