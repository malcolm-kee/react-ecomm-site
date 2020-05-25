import { xFetchJson } from 'lib/ajax';
import { Job } from './career.type';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL as string;

export const getJobs = () => xFetchJson(CAREER_BASE_URL) as Promise<Job[]>;

export const getJob = (jobId: string) =>
  xFetchJson(`${CAREER_BASE_URL}/${jobId}`) as Promise<Job>;
