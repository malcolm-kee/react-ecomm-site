export const safeEval = (code, params = {}) => {
  const parameters = Object.keys(params);
  const args = Object.values(params);
  const wrappedCode = `
      'use strict';
      return (${code});
    `;
  // eslint-disable-next-line no-new-func
  const runCode = new Function(...parameters, wrappedCode);
  return runCode(...args);
};
