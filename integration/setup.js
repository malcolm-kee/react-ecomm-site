const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const playwright = require('playwright');

const { TMP_DIR, browserType, debug } = require('./constants');

module.exports = async function setup() {
  // we launch a browser that will be shared across all tests
  const browserApp = await playwright[browserType].launchBrowserApp({
    webSocket: true,
    headless: !debug,
  });

  global.__PLAYWRIGHT_APP = browserApp;

  // store the websocket endpoint in temp folder
  mkdirp.sync(TMP_DIR);
  fs.writeFileSync(path.join(TMP_DIR, 'wsEndpoint'), browserApp.wsEndpoint());
};
