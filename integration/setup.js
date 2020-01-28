const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const playwright = require('playwright');

const { TMP_DIR, browserType } = require('./constants');

module.exports = async function setup() {
  const browserApp = await playwright[browserType].launchBrowserApp({
    webSocket: true,
  });

  global.__PLAYWRIGHT_APP = browserApp;
  mkdirp.sync(TMP_DIR);
  fs.writeFileSync(path.join(TMP_DIR, 'wsEndpoint'), browserApp.wsEndpoint());
};
