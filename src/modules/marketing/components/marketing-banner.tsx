import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides,
} from '../../../components/carousel';
import { RootState } from '../../../type';
import { loadBanners } from '../marketing.actions';
import { selectBanners, selectNoBanner } from '../marketing.selectors';
import styles from './marketing-banner.module.scss';

class MarketingBannerView extends React.Component<
  ConnectedProps<typeof connector>,
  { loadedImageCount: number }
> {
  state = {
    loadedImageCount: 0,
  };

  loadImage = () =>
    this.setState(prevState => ({
      loadedImageCount: prevState.loadedImageCount + 1,
    }));

  componentDidMount() {
    this.props.loadBanners();
  }

  render() {
    const { banners, noBanner } = this.props;

    if (noBanner) {
      return null;
    }

    const isAllImageLoaded = this.state.loadedImageCount === banners.length;

    return (
      <Carousel interval={2000}>
        {isAllImageLoaded && <CarouselIndicators />}
        <Slides>
          {banners.map(banner => (
            <Slide key={banner['500']}>
              <img
                className={styles.img}
                srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w`}
                src={banner['700']}
                width="700"
                height="350"
                onLoad={this.loadImage}
                alt=""
              />
              {isAllImageLoaded && (
                <div className="carousel-caption">
                  <p>It's only crazy until you buy it.</p>
                  <h1 className="text-warning">Just Buy It.</h1>
                  <p>Show them what a crazy can do.</p>
                </div>
              )}
            </Slide>
          ))}
        </Slides>
      </Carousel>
    );
  }
}

const connector = connect(
  (state: RootState) => ({
    banners: selectBanners(state),
    noBanner: selectNoBanner(state),
  }),
  {
    loadBanners,
  }
);

export const MarketingBanner = connector(MarketingBannerView);
