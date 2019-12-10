import { formatMoney } from './format';

test('formatMoney', () => {
  expect(formatMoney(0.2)).toBe('0.20');
  expect(formatMoney(200)).toBe('200.00');
  expect(formatMoney('200')).toBe('200.00');
  expect(formatMoney(240.2)).toBe('240.20');
  expect(formatMoney('240.2')).toBe('240.20');
  expect(formatMoney(2400.02)).toBe('2400.02');
  expect(formatMoney(2400.02, { thousandSeparator: ',' })).toBe('2,400.02');
  expect(formatMoney(1234567.20312, { thousandSeparator: ',' })).toBe(
    '1,234,567.20'
  );
});
