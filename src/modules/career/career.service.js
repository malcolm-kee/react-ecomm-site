import { fetchJson } from '../../lib/ajax';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL;

export function getJobs() {
  return fetchJson(CAREER_BASE_URL);
}

export function getJob(jobId) {
  return fetchJson(CAREER_BASE_URL, {
    params: {
      id: jobId,
    },
  }).then((res) => res[0]);
}
