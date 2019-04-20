`<Carousel />` is a compound component that should be used in conjunction with `<CarouselIndicators />`, `<Slides />`, and `<Slide />`.

```jsx
import { Carousel } from './carousel';
import { CarouselIndicators } from './carousel-indicators';
import { Slide } from './slide';
import { Slides } from './slides';

<Carousel>
  <CarouselIndicators />
  <Slides>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1001/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Same Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/999/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
  </Slides>
</Carousel>;
```

### Next and Previous Navigation

Use `CarouselBtn` to show Prev and Next at two ends of the Carousel.

```jsx
import { Carousel } from './carousel';
import { CarouselBtn } from './carousel-btn';
import { CarouselIndicators } from './carousel-indicators';
import { Slide } from './slide';
import { Slides } from './slides';

<Carousel>
  <CarouselIndicators />
  <Slides>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1001/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Same Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/999/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
  </Slides>
  <CarouselBtn direction="prev" />
  <CarouselBtn direction="next" />
</Carousel>;
```

### Auto Transition

If you would like the Carousel to auto progress, pass down `interval` props.

```jsx
import { Carousel } from './carousel';
import { CarouselIndicators } from './carousel-indicators';
import { Slide } from './slide';
import { Slides } from './slides';

<Carousel interval={2000}>
  <CarouselIndicators />
  <Slides>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1001/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/1000/350" alt="Cute Corgi" />
      <div className="carousel-caption">Same Cute Corgi</div>
    </Slide>
    <Slide>
      <img src="http://placecorgi.com/999/350" alt="Cute Corgi" />
      <div className="carousel-caption">Different Cute Corgi</div>
    </Slide>
  </Slides>
</Carousel>;
```
