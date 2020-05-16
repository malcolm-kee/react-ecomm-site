import Link from 'next/link';
import * as React from 'react';

const currentYear = new Date().getFullYear();

/**
 * Footer is used to put at the bottom of the page
 */
export function Footer() {
  return (
    <footer className="py-6 bg-blue-600 text-gray-100">
      <div className="container mx-auto px-3">
        <ul className="flex flex-wrap">
          <li className="px-2 pb-2">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="px-2 pb-2">
            <Link href="/help">
              <a>Help</a>
            </Link>
          </li>
          <li className="px-2 pb-2">
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
          </li>
          <li className="px-2 pb-2">
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li className="px-2 pb-2">
            <Link href="/careers">
              <a>Careers</a>
            </Link>
          </li>
          <li className="px-2 pb-2">
            <Link href="/contact-us">
              <a>Contact Us</a>
            </Link>
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
