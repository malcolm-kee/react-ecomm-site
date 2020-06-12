import {
  Carousel,
  CarouselIndicators,
  Slide,
  Slides,
} from 'components/carousel';
import * as React from 'react';
import { useMarketingBanner } from '../marketing.queries';
import { MarketingImage } from './marketing-image';

export const MarketingBanner = () => {
  const { data: banners } = useMarketingBanner();

  const [loadedImageNum, setLoadedImageNum] = React.useState(0);

  const isAllImageLoaded = banners && loadedImageNum <= banners.length;

  const loadImage = () => {
    setLoadedImageNum((x) => x + 1);
  };

  return banners ? (
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
            <MarketingImage banner={banner} onLoad={loadImage} />
          </Slide>
        ))}
      </Slides>
    </Carousel>
  ) : null;
};
