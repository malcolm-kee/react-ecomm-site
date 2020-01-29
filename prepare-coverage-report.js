const fs = require('fs');
const path = require('path');

const rimraf = require('rimraf');

const coverageReportDir = path.resolve(__dirname, 'coverage-report');
const nycDir = path.resolve(__dirname, '.nyc_output');

rimraf.sync(coverageReportDir);
fs.mkdirSync(coverageReportDir);

fs.copyFileSync(
  path.resolve(__dirname, 'cypress-coverage', 'coverage-final.json'),
  path.resolve(coverageReportDir, 'from-cypress.json')
);
fs.copyFileSync(
  path.resolve(__dirname, 'coverage', 'coverage-final.json'),
  path.resolve(coverageReportDir, 'from-jest.json')
);

rimraf.sync(nycDir);
fs.mkdirSync(nycDir);
