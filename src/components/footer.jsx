import { Link } from '@reach/router';
import React from 'react';
import styles from './footer.module.scss';

const currentYear = new Date().getFullYear();

/**
 * Footer is used to put at the bottom of the page
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <ul className="nav nav-stacked">
              <li>
                <Link to="/">Home</Link>
                <Link to="/help">Help</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8">
            <div className="pull-right">
              <small>
                &copy; Copyright {currentYear} Shopit. All Rights Reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
