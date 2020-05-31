import { xFetchJson } from 'lib/ajax';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL;

export const getJobs = () => xFetchJson(CAREER_BASE_URL);

export const getJob = (jobId) => xFetchJson(`${CAREER_BASE_URL}/${jobId}`);
