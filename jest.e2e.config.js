/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  testEnvironment: './integration/jest-playwright-environment.js',
  globalSetup: './integration/setup.js',
  globalTeardown: './integration/teardown.js',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(e2e).[tj]s?(x)'],
};
