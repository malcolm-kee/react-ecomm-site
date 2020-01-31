import cx from 'classnames';
import * as React from 'react';
import styles from './main-content.module.scss';

export const MainContent = (props: JSX.IntrinsicElements['main']) => (
  <main {...props} className={cx(styles.main, props.className)} />
);
