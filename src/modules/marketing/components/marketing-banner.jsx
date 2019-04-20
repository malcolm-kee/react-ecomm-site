import { inject, observer } from 'mobx-react';
import React from 'react';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides
} from '../../../components/carousel';

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
              <img
                srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${
                  banner['1242']
                } 1242w`}
                src={banner['700']}
                alt=""
              />
              <div className="carousel-caption">
                <p>It's only crazy until you buy it.</p>
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
