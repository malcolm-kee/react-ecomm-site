import { safeEval } from './safe-eval';

describe(`safeEval`, () => {
  test('run function', () => {
    const code = `x * y`;
    const params = {
      x: 2,
      y: 3
    };
    expect(safeEval(code, params)).toBe(6);
  });

  test('eval expression', () => {
    expect(safeEval(`'Hello!'`)).toBe('Hello!');
  });
});
