import { xFetchJson } from 'lib/ajax';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL;

export function getJobs() {
  return xFetchJson(CAREER_BASE_URL);
}

export function getJob(jobId) {
  return xFetchJson(`${CAREER_BASE_URL}/${jobId}`);
}
