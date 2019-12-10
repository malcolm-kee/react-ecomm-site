export const isDefined = <T>(value: T | undefined): value is T =>
  typeof value !== 'undefined';

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

export const isNumber = (value: any): value is number =>
  typeof value === 'number';

export const isPrimitive = (value: any): value is string | number | boolean =>
  /^(b|st|n)/.test(typeof value);

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';
