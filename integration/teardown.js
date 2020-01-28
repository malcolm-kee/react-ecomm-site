module.exports = async function teardown() {
  await global.__PLAYWRIGHT_APP.close();
};
