import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides
} from '../../../components/carousel';
import { RootState } from '../../../type';
import { loadBanners } from '../marketing.actions';
import { selectBanners, selectNoBanner } from '../marketing.selectors';

type ReduxProps = ConnectedProps<typeof connector>;

class MarketingBannerView extends React.Component<ReduxProps> {
  componentDidMount() {
    this.props.loadBanners();
  }

  render() {
    const { banners, noBanner } = this.props;

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
                srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w`}
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

const mapState = (state: RootState) => ({
  banners: selectBanners(state),
  noBanner: selectNoBanner(state)
});

const mapDispatch = {
  loadBanners
};

const connector = connect(
  mapState,
  mapDispatch
);

export const MarketingBanner = connector(MarketingBannerView);
