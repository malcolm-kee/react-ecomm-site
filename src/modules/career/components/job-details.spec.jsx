import { renderWithQuery } from 'lib/test-util';
import React from 'react';
import xhrMock from 'xhr-mock';
import { careers } from '../__mocks__/career.data';
import { JobDetails } from './job-details';

describe(`<JobDetails />`, () => {
  beforeEach(() => {
    xhrMock.setup();
  });

  afterEach(() => {
    xhrMock.teardown();
  });

  it(`retrieves details for provided jobId`, async () => {
    xhrMock.get(/.*/, {
      status: 200,
      body: JSON.stringify([careers[0]]),
    });

    const { findByText } = renderWithQuery(<JobDetails jobId={3} />);

    await findByText('Department:');
  });

  it(`shows error message when error`, async () => {
    xhrMock.get(/.*/, {
      status: 500,
    });

    const { findByRole } = renderWithQuery(<JobDetails jobId={3} />);

    const alert = await findByRole('alert');
    expect(alert).toMatchInlineSnapshot(`
      <div
        class="border-2 px-3 py-2 rounded-lg border-red-500 bg-red-100 text-red-900"
        role="alert"
      >
        Fails to get details.
      </div>
    `);
  });
});
