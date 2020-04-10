import * as React from 'react';
import { useGetData } from '../../hooks/use-get-data';
import { Job } from './career.type';

const CAREER_BASE_URL = process.env.REACT_APP_CAREER_BASE_URL as string;

export function useJobs() {
  const { data, status } = useGetData(CAREER_BASE_URL, [] as Job[]);

  return {
    jobs: data,
    status,
  };
}

export function useJob(jobId: number) {
  const requestParams = React.useMemo(
    () => ({
      id: jobId,
    }),
    [jobId]
  );

  const { data, status } = useGetData(
    CAREER_BASE_URL,
    [] as Job[],
    requestParams
  );

  return {
    job: data[0],
    status,
  };
}
