import React from 'react';
import { connect } from 'react-redux';
import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides,
} from '../../../components/carousel';
import { loadBanners } from '../marketing.actions';
import { selectBanners, selectNoBanner } from '../marketing.selectors';

class MarketingBannerView extends React.Component {
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

    const isAllImageLoaded = this.state.loadedImageCount === banners.length;

    return (
      <Carousel interval={2000}>
        {isAllImageLoaded && <CarouselIndicators />}
        <Slides>
          {banners.map((banner) => (
            <Slide
              caption={
                isAllImageLoaded && (
                  <>
                    <p>It's only crazy until you buy it.</p>
                    <h1 className="text-orange-500 text-2xl lg:text-4xl">
                      Just Buy It.
                    </h1>
                    <p>Show them what a crazy can do.</p>
                  </>
                )
              }
              key={banner['500']}
            >
              <img
                srcSet={`${banner['500']} 500w, ${banner['700']} 700w, ${banner['1242']} 1242w`}
                src={banner['700']}
                alt=""
                onLoad={this.loadImage}
              />
            </Slide>
          ))}
        </Slides>
      </Carousel>
    );
  }
}

const mapState = (state) => ({
  banners: selectBanners(state),
  noBanner: selectNoBanner(state),
});

const mapDispatch = {
  loadBanners,
};

export const MarketingBanner = connect(
  mapState,
  mapDispatch
)(MarketingBannerView);
