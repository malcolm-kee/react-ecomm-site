import { pick } from './object';

test(`pick`, () => {
  expect(
    pick(
      {
        a: 'A',
        b: 'B',
      },
      ['a']
    )
  ).toStrictEqual({
    a: 'A',
  });
});
