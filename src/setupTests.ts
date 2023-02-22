import '@testing-library/jest-dom';

Object.defineProperty(window, 'IntersectionObserver', {
  value: class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  },
});

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
});

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});
