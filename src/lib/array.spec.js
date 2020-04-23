import { flattenArray, map } from './array';

test('flattenArray', () => {
  expect(flattenArray([1, [2, 3, [4], 5], 6, [7]])).toEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ]);
  expect(flattenArray([1, [2], 3])).toEqual([1, 2, 3]);
  expect(flattenArray([[[1]], { a: 'a' }, [[{ b: 'b' }]]])).toEqual([
    1,
    { a: 'a' },
    { b: 'b' },
  ]);
});

test('map', () => {
  expect(map([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
  expect(map(['Malcolm', 'Kee'], (str) => str[0])).toEqual(['M', 'K']);
});
