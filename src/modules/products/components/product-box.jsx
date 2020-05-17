import cx from 'classnames';
import { Panel, PanelBody, PanelHeading } from 'components/panel';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './product-box.module.scss';
import { ProductImage } from './product-image';

export function ProductBox({ id, name, images, price, className }) {
  return (
    <Panel
      color="default"
      className={cx(styles.productBox, className)}
      renderContainer={(props) => (
        <Link to={`/product/${id}`} data-testid="productBox" {...props} />
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
