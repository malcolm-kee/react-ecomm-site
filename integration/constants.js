const path = require('path');
const os = require('os');

const browsers = {
  chromium: 'chromium',
  firefox: 'firefox',
  webkit: 'webkit',
};

module.exports = {
  TMP_DIR: path.join(os.tmpdir(), 'jest_playwright_global_setup'),
  browserType: browsers[process.env.PLAYWRIGHT_BROWSER] || browsers.chromium,
};
