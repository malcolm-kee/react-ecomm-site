export const isDefined = value => typeof value !== 'undefined';

export const isBoolean = value => typeof value === 'boolean';

export const isNumber = value => typeof value === 'number';

export const isPrimitive = value => /^(b|st|n)/.test(typeof value);
