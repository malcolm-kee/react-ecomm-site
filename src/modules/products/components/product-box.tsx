import cx from 'classnames';
import { Panel, PanelBody, PanelHeading } from 'components/panel';
import Link from 'next/link';
import * as React from 'react';
import { Product } from '../product.type';
import styles from './product-box.module.scss';
import { ProductImage } from './product-image';

export function ProductBox({
  _id,
  name,
  images,
  price,
  className,
}: Product & { className?: string }) {
  return (
    <Panel
      color="default"
      className={cx(styles.productBox, className)}
      renderContainer={(props) => (
        <Link href="/product/[productId]" as={`/product/${_id}`}>
          <a {...props} data-testid="productBox" />
        </Link>
      )}
    >
      <PanelHeading className={styles.name}>{name}</PanelHeading>
      <PanelBody className={styles.body}>
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
          <div className={styles.placeholder} />
        )}
        {price && (
          <div className={styles.desc}>
            <p>RM {price}</p>
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}
