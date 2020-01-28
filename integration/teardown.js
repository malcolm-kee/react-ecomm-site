const rimraf = require('rimraf');
const { TMP_DIR } = require('./constants');

module.exports = async function teardown() {
  await global.__PLAYWRIGHT_APP.close();

  // cleanup the temp file that store websocket url
  rimraf.sync(TMP_DIR);
};
