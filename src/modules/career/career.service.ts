import * as React from 'react';
import { fetchJson, xhrX } from '../../lib/ajax';
import { Job } from './career.type';
import { UiStatus } from '../../type';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL as string;

export function getJobs(): Promise<Job[]> {
  return fetchJson(CAREER_BASE_URL);
}

export function useJobs() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [status, setStatus] = React.useState<UiStatus>('busy');

  React.useEffect(() => {
    const { xhr, fetch } = xhrX(CAREER_BASE_URL, { json: true });
    fetch()
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));

    return () => {
      xhr.abort();
    };
  }, []);

  return {
    jobs,
    status,
  };
}

export function getJob(jobId: number): Promise<Job> {
  return fetchJson(CAREER_BASE_URL, {
    params: {
      id: jobId,
    },
  }).then(res => res[0]);
}
