import { render } from '@testing-library/react';
import React from 'react';
import { getJob as getJobMock } from '../career.service';
import { JobDetails } from './job-details';

jest.mock('../career.service');

describe(`<JobDetails />`, () => {
  it(`retrieves details for provided jobId`, async () => {
    const { findByText } = render(<JobDetails jobId={3} />);

    await findByText('Department:');

    expect(getJobMock).toHaveBeenCalledTimes(1);
    expect(getJobMock).toHaveBeenCalledWith(3);
  });

  it(`shows error message when error`, async () => {
    getJobMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error'))
    );

    const { findByRole } = render(<JobDetails jobId={3} />);

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
