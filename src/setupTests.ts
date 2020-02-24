import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
});

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});