import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
});
