import { Link } from '@reach/router';
import React from 'react';
import { PanelBody, PanelHeading } from '../../../components/panel';
import './product-box.css';
import { ProductImage } from './product-image';

export function ProductBox({ id, name, images, price }) {
  return (
    <Link to={`/product/${id}`} className="panel panel-default product-box">
      <PanelHeading className="product-box-name">{name}</PanelHeading>
      <PanelBody className="product-box-body">
        {images ? (
          <ProductImage
            url={images.thumbStandard}
            webpUrl={images.thumbWebp}
            blurUrl={images.thumbBlur}
            alt={name}
            width={188}
            height={188}
          />
        ) : (
          <div className="product-image-placeholder" />
        )}
        {price && (
          <div className="product-box-desc">
            <p>RM {price}</p>
          </div>
        )}
      </PanelBody>
    </Link>
  );
}
