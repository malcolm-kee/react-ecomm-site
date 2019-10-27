export const isDefined = <T>(value: T | undefined): value is T =>
  typeof value !== 'undefined';

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

export const isPrimitive = (value: any): value is string | number | boolean =>
  /^(b|st|n)/.test(typeof value);
