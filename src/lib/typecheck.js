export const isBoolean = value => typeof value === 'boolean';

export const isPrimitive = value => /^(b|s|n)/.test(typeof value);
