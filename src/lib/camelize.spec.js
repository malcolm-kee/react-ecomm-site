import { camelize } from './camelize';

test('camelize', () => {
  expect(camelize('background-color')).toBe('backgroundColor');
  expect(camelize('border-top')).toBe('borderTop');
});
