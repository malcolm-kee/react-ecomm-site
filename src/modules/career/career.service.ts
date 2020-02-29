import { fetchJson } from '../../lib/ajax';
import { Job } from './career.type';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL as string;

export function getJobs(): Promise<Job[]> {
  return fetchJson(CAREER_BASE_URL);
}

export function getJob(jobId: number): Promise<Job> {
  return fetchJson(CAREER_BASE_URL, {
    params: {
      id: jobId,
    },
  }).then(res => res[0]);
}
