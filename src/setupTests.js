import '@testing-library/jest-dom/extend-expect';
import { queryCache } from 'react-query';

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
});

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});

afterEach(() => {
  queryCache.clear();
});
