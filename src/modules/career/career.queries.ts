import { useQuery } from '@tanstack/react-query';
import { getJobs, getJob } from './career.service';

export function useJobs() {
  return useQuery(['jobs'], getJobs);
}

export function useJob(jobId: string) {
  return useQuery(['job', jobId], () => getJob(jobId));
}
