import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Carousel } from './carousel';
import { CarouselBtn } from './carousel-btn';
import { CarouselIndicators } from './carousel-indicators';
import { Slide } from './slide';
import { Slides } from './slides';

jest.mock('react-transition-group', () => {
  const React = require('react');

  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn(props => (
    <FakeTransition>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, {
          className:
            props.classNames && props.in
              ? props.classNames.enterDone
              : props.classNames.exitDone
        })
      )}
    </FakeTransition>
  ));
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition };
});

function renderCarousel({ additionUi, initialSlide, interval } = {}) {
  const renderResults = render(
    <Carousel initialSlide={initialSlide} interval={interval}>
      <CarouselIndicators />
      <Slides>
        <Slide>Something</Slide>
        <Slide>Something Else</Slide>
        <Slide>Something Something Else</Slide>
      </Slides>
      {additionUi}
    </Carousel>
  );

  const { getAllByTestId, getByTestId, container } = renderResults;

  return {
    ...renderResults,
    getIndicatorsCount: () => getAllByTestId('carousel-indicator').length,
    isSlide1Active: () => getByTestId('slide-0').className === 'item active',
    isSlide2Active: () => getByTestId('slide-1').className === 'item active',
    isSlide3Active: () => getByTestId('slide-2').className === 'item active',
    moveCursorOntoActiveSlide: () =>
      fireEvent.mouseEnter(
        container.querySelector('.carousel-inner > .item.active')
      ),
    moveCursorAwayFromActiveSlide: () =>
      fireEvent.mouseLeave(
        container.querySelector('.carousel-inner > .item.active')
      ),
    clickIndicator: index =>
      fireEvent.click(getAllByTestId('carousel-indicator')[index])
  };
}

describe('<Carousel />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

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

  it('shows correct slide given initialSlide', async () => {
    const { isSlide2Active } = renderCarousel({
      initialSlide: 1
    });

    expect(isSlide2Active()).toBe(true);
  });

  it('able to navigate with indicator', () => {
    const {
      clickIndicator,
      isSlide1Active,
      isSlide2Active,
      isSlide3Active
    } = renderCarousel();

    clickIndicator(1);

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(true);
    expect(isSlide3Active()).toBe(false);

    clickIndicator(0);

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);
  });

  it('able to navigate with CarouselBtn', () => {
    const {
      getByText,
      isSlide1Active,
      isSlide2Active,
      isSlide3Active
    } = renderCarousel({
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

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);

    clickNext();

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(true);
    expect(isSlide3Active()).toBe(false);

    clickNext();

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(true);

    clickNext();

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);

    clickPrev();

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(true);

    clickPrev();

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(true);
    expect(isSlide3Active()).toBe(false);
  });

  it('will navigate to next every specific interval', async () => {
    const { isSlide1Active, isSlide2Active, isSlide3Active } = renderCarousel({
      interval: 10
    });

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(true);
    expect(isSlide3Active()).toBe(false);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(true);
  });

  it('will not navigate when hover', async () => {
    const {
      moveCursorOntoActiveSlide,
      moveCursorAwayFromActiveSlide,
      isSlide1Active,
      isSlide2Active,
      isSlide3Active
    } = renderCarousel({
      interval: 10
    });

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);

    moveCursorOntoActiveSlide();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(isSlide1Active()).toBe(true);
    expect(isSlide2Active()).toBe(false);
    expect(isSlide3Active()).toBe(false);

    moveCursorAwayFromActiveSlide();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(isSlide1Active()).toBe(false);
    expect(isSlide2Active()).toBe(true);
    expect(isSlide3Active()).toBe(false);
  });
});
