test('canary', () => {
  expect(true).toBe(true);
});

test('browser is available', () => {
  expect(global.browser).toBeDefined();
});
