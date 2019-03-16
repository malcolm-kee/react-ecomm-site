```jsx
import { Slide } from './slide';
import { Carousel } from './carousel';
import { CarouselBtn } from './carousel-btn';

<Carousel interval={1000}>
  <Slide>
    <h1>Slide 1</h1>
    <div>
      <CarouselBtn direction="prev" />
      <CarouselBtn direction="next" />
    </div>
  </Slide>
  <Slide>
    <h1>Slide 2</h1>
    <div>
      <CarouselBtn direction="prev" />
      <CarouselBtn direction="next" />
    </div>
  </Slide>
  <Slide>
    <h1>Slide 3</h1>
    <div>
      <CarouselBtn direction="prev" />
      <CarouselBtn direction="next" />
    </div>
  </Slide>
  <Slide>
    <h1>Slide 4</h1>
    <div>
      <CarouselBtn direction="prev" />
      <CarouselBtn direction="next" />
    </div>
  </Slide>
</Carousel>;
```
