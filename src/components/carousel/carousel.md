`<Carousel />` is a compound component that should be used in conjunction with `<CarouselIndicators />`, `<Slides />`, and `<Slide />`.

```jsx
import { Carousel } from './carousel';
import { CarouselIndicators } from './carousel-indicators';
import { Slide } from './slide';
import { Slides } from './slides';

<Carousel>
  <CarouselIndicators />
  <Slides>
    <Slide caption="Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/1001/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Same Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/999/350/animals" alt="Cute Animal" />
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
    <Slide caption="Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/1001/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Same Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/999/350/animals" alt="Cute Animal" />
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
    <Slide caption="Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/1001/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Same Cute Animal">
      <img src="https://placeimg.com/1000/350/animals" alt="Cute Animal" />
    </Slide>
    <Slide caption="Different Cute Animal">
      <img src="https://placeimg.com/999/350/animals" alt="Cute Animal" />
    </Slide>
  </Slides>
</Carousel>;
```
