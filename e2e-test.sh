#!/bin/bash
set -e

echo "cleaning up previous coverage report...";

rm -rf .nyc_output coverage cypress-coverage coverage-report;

{
    echo "executing integration and e2e test...";

    yarn run test:all;

} && {

    echo "generating coverage report...";

    mkdir -p coverage-report;

    cp ./cypress-coverage/coverage-final.json ./coverage-report/from-cypress.json;
    cp ./coverage/coverage-final.json ./coverage-report/from-jest.json;

    # merge report in coverage-report folder
    yarn run nyc merge coverage-report;

    # move the generated merged data into nyc folder
    mv -f coverage.json .nyc_output/out.json;
    # generate the report in coverage-report folder
    yarn run nyc report --reporter lcov --report-dir coverage-report;
}

