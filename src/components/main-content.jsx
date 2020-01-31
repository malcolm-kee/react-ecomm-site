import cx from 'classnames';
import React from 'react';
import styles from './main-content.module.scss';

export const MainContent = props => (
  <main {...props} className={cx(styles.main, props.className)} />
);
