import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from './spinner';
import styles from './image.module.css';

/**
 * Image is a component that allows you to specify image with its standard format (jpg/png/gif)
 * and webp format. It will fallback to use the standard format if browser doesn't support webp.
 */
export class Image extends React.Component {
  state = {
    isLoading: true
  };

  onImageLoaded = () => {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      src,
      webpSrc,
      blurSrc,
      alt,
      width,
      height,
      ...imageProps
    } = this.props;

    return (
      <div className={styles.root}>
        {this.state.isLoading && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        {blurSrc && (
          <img
            className={styles.blur}
            onLoad={this.onImageLoaded}
            onError={this.onImageLoaded}
            src={blurSrc}
            alt={alt}
            loading="lazy"
          />
        )}
        {(!blurSrc || !this.state.isLoading) && ( // show the fulll image if not blur image or blur image is loaded
          <picture onLoad={this.onImageLoaded} onError={this.onImageLoaded}>
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <source srcSet={src} type="image/jpeg" />
            <img
              onLoad={this.onImageLoaded}
              alt={alt}
              src={src}
              {...imageProps}
            />
          </picture>
        )}
      </div>
    );
  }
}

Image.propTypes = {
  /**
   * Src for the standard image, be jpeg format
   */
  src: PropTypes.string.isRequired,
  /**
   * Src for the webp version of the image
   */
  webpSrc: PropTypes.string,
  /**
   * Src for the blur version of the image.
   * If this is available, it will be loaded before the image at `src` is loaded
   */
  blurSrc: PropTypes.string,
  /**
   * Description for the image, important for accessibility
   */
  alt: PropTypes.string.isRequired
};
