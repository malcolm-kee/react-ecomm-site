import { Job } from '../career.type';
import { careers } from './career.data';

export const getJob = jest.fn(
  (jobId: number): Promise<Job> => {
    return Promise.resolve({
      id: jobId,
      ...careers[0],
    });
  }
);
