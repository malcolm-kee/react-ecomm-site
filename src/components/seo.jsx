import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export const Seo = ({ title, description, children }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {children}
  </Helmet>
);

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};
