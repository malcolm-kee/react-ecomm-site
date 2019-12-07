import { isBoolean, isDefined, isPrimitive } from './typecheck';

describe('isBoolean', () => {
  const testData = [
    [true, true],
    [false, true],
    [undefined, false],
    [{}, false],
    ['', false],
    [1000, false],
    [Symbol('12837'), false],
    [new Image(), false],
  ];

  testData.forEach(([data, result]) => {
    test(`isBoolean(${data && data.toString()}) is ${result}`, () => {
      expect(isBoolean(data)).toBe(result);
    });
  });
});

describe('isDefined', () => {
  const testData = [
    [true, true],
    [false, true],
    [undefined, false],
    [{}, true],
    ['', true],
    [1000, true],
    [Symbol('12837'), true],
    [new Image(), true],
  ];

  testData.forEach(([data, result]) => {
    test(`isDefined(${data && data.toString()}) is ${result}`, () => {
      expect(isDefined(data)).toBe(result);
    });
  });
});

describe('isPrimitive', () => {
  const testData = [
    [true, true],
    [false, true],
    [undefined, false],
    [{}, false],
    ['', true],
    [1000, true],
    [Symbol('12837'), false],
    [new Image(), false],
  ];

  testData.forEach(([data, result]) => {
    test(`isPrimitive(${data && data.toString()}) is ${result}`, () => {
      expect(isPrimitive(data)).toBe(result);
    });
  });
});
