import { cleanup, screen } from '@testing-library/react';
import { renderWithQuery } from 'lib/test-util';
import * as React from 'react';
import { getJob as getJobMock } from '../career.service';
import { JobDetails } from './job-details';

jest.mock('../career.service');

describe(`<JobDetails />`, () => {
  it(`retrieves details for provided jobId`, async () => {
    renderWithQuery(<JobDetails jobId="3" />);

    await screen.findByText('Department:');

    expect(getJobMock).toHaveBeenCalledTimes(1);
    expect(getJobMock).toHaveBeenCalledWith('3');

    cleanup();
  });

  it(`shows error message when error`, async () => {
    getJobMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error'))
    );

    renderWithQuery(<JobDetails jobId="3" />);

    const alert = await screen.findByRole('alert');
    expect(alert).toMatchInlineSnapshot(`
      <div
        class="border-2 px-3 py-2 rounded-lg border-red-500 bg-red-100 text-red-900"
        role="alert"
      >
        Fails to get details.
      </div>
    `);

    cleanup();
  });
});
