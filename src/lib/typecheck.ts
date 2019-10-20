export const isDefined = <T>(value: T | undefined): value is T =>
  typeof value !== 'undefined';

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

export const isPrimitive = <Value>(
  value: Value
): value is Extract<Value, string | number | boolean> =>
  /^(b|st|n)/.test(typeof value);
