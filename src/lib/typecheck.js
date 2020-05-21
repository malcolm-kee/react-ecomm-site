export const isDefined = (value) => typeof value !== 'undefined';

export const isBoolean = (value) => typeof value === 'boolean';

export const isPrimitive = (value) => /^(b|st|n)/.test(typeof value);
