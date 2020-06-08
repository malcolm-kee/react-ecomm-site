import fetch from 'isomorphic-unfetch';
import { Job } from './career.type';

const CAREER_BASE_URL = process.env.NEXT_PUBLIC_CAREER_BASE_URL as string;

const fetchOptions = {
  headers: {
    Accept: 'application/json',
  },
};

export const getJobs = () =>
  fetch(CAREER_BASE_URL, fetchOptions).then((res) => res.json()) as Promise<
    Job[]
  >;

export const getJob = (jobId: string) =>
  fetch(`${CAREER_BASE_URL}/${jobId}`, fetchOptions).then((res) =>
    res.json()
  ) as Promise<Job>;
