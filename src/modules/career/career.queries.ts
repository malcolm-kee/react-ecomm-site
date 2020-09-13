import { useQuery } from 'react-query';
import { getJobs, getJob } from './career.service';

export function useJobs() {
  return useQuery(['jobs'], getJobs);
}

export function useJob(jobId: string) {
  return useQuery(['job', jobId], (_, id: string) => getJob(id));
}
