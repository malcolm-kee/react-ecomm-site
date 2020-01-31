import { inject, observer } from 'mobx-react';
import React from 'react';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides,
} from '../../../components/carousel';
import { MarketingImage } from './marketing-image';

class MarketingBannerView extends React.Component {
  state = {
    loadedImageCount: 0,
  };

  loadImage = () =>
    this.setState(prevState => ({
      loadedImageCount: prevState.loadedImageCount + 1,
    }));

  componentDidMount() {
    this.props.marketing.loadBanners();
  }

  render() {
    const {
      marketing: { banners, noBanner },
    } = this.props;

    if (noBanner) {
      return null;
    }

    const isAllImageLoaded = this.state.loadedImageCount === banners.length;

    return (
      <Carousel interval={2000}>
        {isAllImageLoaded && <CarouselIndicators />}
        <Slides>
          {banners.map(banner => (
            <Slide
              caption={
                <>
                  <p>It's only crazy until you buy it.</p>
                  <h1 className="text-orange-500 text-2xl lg:text-4xl">
                    Just Buy It.
                  </h1>
                  <p>Show them what a crazy can do.</p>
                </>
              }
              key={banner['500']}
            >
              <MarketingImage banner={banner} onLoad={this.loadImage} />
            </Slide>
          ))}
        </Slides>
      </Carousel>
    );
  }
}

export const MarketingBanner = inject('marketing')(
  observer(MarketingBannerView)
);
