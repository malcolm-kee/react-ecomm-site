import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Carousel } from './carousel';
import { CarouselBtn } from './carousel-btn';
import { CarouselIndicators } from './carousel-indicators';
import { Slides } from './slides';
import { Slide } from './slide';

function renderCarousel({ additionUi, initialSlide } = {}) {
  const renderResults = render(
    <Carousel initialSlide={initialSlide}>
      <CarouselIndicators />
      <Slides>
        <Slide>Something</Slide>
        <Slide>Something Else</Slide>
        <Slide>Something Something Else</Slide>
      </Slides>
      {additionUi}
    </Carousel>
  );

  const { getAllByTestId, getByTestId } = renderResults;

  return {
    ...renderResults,
    getIndicatorsCount: () => getAllByTestId('carousel-indicator').length,
    getSlide1: () => getByTestId('slide-0'),
    getSlide2: () => getByTestId('slide-1'),
    getSlide3: () => getByTestId('slide-2'),
    clickIndicator: index =>
      fireEvent.click(getAllByTestId('carousel-indicator')[index])
  };
}

describe('<Carousel />', () => {
  it('auto sync number of indicator with number of slides', () => {
    const { getIndicatorsCount, rerender } = renderCarousel();

    expect(getIndicatorsCount()).toBe(3);

    rerender(
      <Carousel>
        <CarouselIndicators />
        <Slides>
          <Slide>Something</Slide>
          <Slide>Something Else</Slide>
        </Slides>
      </Carousel>
    );

    expect(getIndicatorsCount()).toBe(2);
  });

  it('shows correct slide given initialSlide', () => {
    const { getSlide2 } = renderCarousel({
      initialSlide: 1
    });

    expect(getSlide2().className).toBe('item active');
  });

  it('able to navigate with indicator', () => {
    const {
      clickIndicator,
      getSlide1,
      getSlide2,
      getSlide3
    } = renderCarousel();

    clickIndicator(1);

    expect(getSlide1().className).toBe('item');
    expect(getSlide2().className).toBe('item active');
    expect(getSlide3().className).toBe('item');

    clickIndicator(0);

    expect(getSlide1().className).toBe('item active');
    expect(getSlide2().className).toBe('item');
    expect(getSlide3().className).toBe('item');
  });

  it('able to navigate with CarouselBtn', () => {
    const { getByText, getSlide1, getSlide2, getSlide3 } = renderCarousel({
      additionUi: (
        <>
          <CarouselBtn />
          <CarouselBtn direction="prev" />
        </>
      )
    });

    function clickNext() {
      fireEvent.click(getByText('Next'));
    }

    function clickPrev() {
      fireEvent.click(getByText('Previous'));
    }

    expect(getSlide1().className).toBe('item active');
    expect(getSlide2().className).toBe('item');
    expect(getSlide3().className).toBe('item');

    clickNext();

    expect(getSlide1().className).toBe('item');
    expect(getSlide2().className).toBe('item active');
    expect(getSlide3().className).toBe('item');

    clickNext();

    expect(getSlide1().className).toBe('item');
    expect(getSlide2().className).toBe('item');
    expect(getSlide3().className).toBe('item active');

    clickNext();

    expect(getSlide1().className).toBe('item active');
    expect(getSlide2().className).toBe('item');
    expect(getSlide3().className).toBe('item');

    clickPrev();

    expect(getSlide1().className).toBe('item');
    expect(getSlide2().className).toBe('item');
    expect(getSlide3().className).toBe('item active');

    clickPrev();

    expect(getSlide1().className).toBe('item');
    expect(getSlide2().className).toBe('item active');
    expect(getSlide3().className).toBe('item');
  });
});
