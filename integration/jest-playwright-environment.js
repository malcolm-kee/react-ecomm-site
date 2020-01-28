const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

const { TMP_DIR, browserType } = require('./constants');

class PlayWrightEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    const wsEndpoint = fs.readFileSync(
      path.join(TMP_DIR, 'wsEndpoint'),
      'utf8'
    );

    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to browser and make it accessible via `global.browser` in the tests
    this.global.browser = await playwright[browserType].connect({
      browserWSEndpoint: wsEndpoint,
    });
  }
}

module.exports = PlayWrightEnvironment;
