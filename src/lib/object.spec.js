import { omit, pick } from './object';

test('pick', () => {
  const result = pick(
    {
      a: 'A',
      b: 'B'
    },
    ['a']
  );

  expect(result).toEqual({
    a: 'A'
  });
});

test('omit', () => {
  expect(
    omit(
      {
        a: 'A',
        b: 'B',
        three: 3
      },
      ['a']
    )
  ).toEqual({
    b: 'B',
    three: 3
  });
});
