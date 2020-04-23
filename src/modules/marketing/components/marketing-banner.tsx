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
import { MarketingImage } from './marketing-image';

class MarketingBannerView extends React.Component<
  ConnectedProps<typeof connector>,
  { loadedImageCount: number }
> {
  state = {
    loadedImageCount: 0,
  };

  loadImage = () =>
    this.setState((prevState) => ({
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

    const isAllImageLoaded = this.state.loadedImageCount >= banners.length;

    return (
      <Carousel>
        {isAllImageLoaded && <CarouselIndicators />}
        <Slides>
          {banners.map((banner) => (
            <Slide
              key={banner['500']}
              caption={
                isAllImageLoaded && (
                  <div className="carousel-caption">
                    <p>It's only crazy until you buy it.</p>
                    <h1 className="text-orange-500 text-2xl lg:text-4xl">
                      Just Buy It.
                    </h1>
                    <p>Show them what a crazy can do.</p>
                  </div>
                )
              }
            >
              <MarketingImage banner={banner} onLoad={this.loadImage} />
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
