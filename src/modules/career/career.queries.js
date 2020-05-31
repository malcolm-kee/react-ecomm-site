import { useQuery } from 'react-query';
import { getJob, getJobs } from './career.service';

export function useJobs() {
  return useQuery(['jobs'], getJobs);
}

export function useJob(jobId) {
  return useQuery(['job', jobId], (_, id) => getJob(id));
}
