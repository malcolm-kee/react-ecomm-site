import * as React from 'react';
import { Helmet } from 'react-helmet';

export type SeoProps = {
  title: string;
};

/**
 * Configure metadata to be added in `head` for SEO purpose.
 */
export const Seo = (props: SeoProps) => (
  <Helmet>
    <title>{props.title}</title>
  </Helmet>
);
