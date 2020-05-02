import { screen } from '@testing-library/react';
import * as React from 'react';
import { renderWithRouter } from '../../../lib/test-util';
import { getJobs as getJobsMock } from '../career.service';
import { AllJobs } from './all-jobs';

jest.mock('../career.service');

test(`<AllJobs />`, async () => {
  const jobData = [
    {
      id: 1,
      title: 'Programmer',
    },
    {
      id: 2,
      title: 'Designer',
    },
  ];

  getJobsMock.mockImplementationOnce(() => Promise.resolve(jobData));

  renderWithRouter(<AllJobs />);

  const $firstJob = await screen.findByText(jobData[0].title);

  expect($firstJob).toBeVisible();
});
