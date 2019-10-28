import { Link } from '@reach/router';
import React from 'react';
import { Panel, PanelBody, PanelHeading } from '../../../components/panel';
import { Product } from '../product.type';
import './product-box.css';
import { ProductImage } from './product-image';

export function ProductBox({ id, name, images, price }: Product) {
  return (
    <Panel
      color="default"
      className="product-box"
      renderContainer={props => <Link to={`/product/${id}`} {...props} />}
    >
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
    </Panel>
  );
}
