import * as React from 'react';
import { Helmet } from 'react-helmet';

export type SeoProps = {
  title: string;
};

export const Seo = (props: SeoProps) => (
  <Helmet>
    <title>{props.title}</title>
  </Helmet>
);
