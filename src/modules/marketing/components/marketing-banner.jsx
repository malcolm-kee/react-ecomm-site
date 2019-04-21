import { inject, observer } from 'mobx-react';
import React from 'react';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides
} from '../../../components/carousel';
import { MarketingImage } from './marketing-image';

class MarketingBannerView extends React.Component {
  componentDidMount() {
    this.props.marketing.loadBanners();
  }

  render() {
    const {
      marketing: { banners, noBanner }
    } = this.props;

    if (noBanner) {
      return null;
    }

    return (
      <Carousel interval={2000}>
        <CarouselIndicators />
        <Slides>
          {banners.map(banner => (
            <Slide key={banner['500']}>
              <MarketingImage banner={banner} />
              <div className="carousel-caption">
                <p className="hidden-xs">It's only crazy until you buy it.</p>
                <h1 className="text-warning">Just Buy It.</h1>
                <p>Show them what a crazy can do.</p>
              </div>
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
