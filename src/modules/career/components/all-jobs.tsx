import * as React from 'react';
import { ListGroup } from '../../../components/list-group';
import { Spinner } from '../../../components/spinner';
import { useJobs } from '../career.queries';

export const AllJobs = () => {
  const { data: jobs } = useJobs();

  return (
    <div>
      {jobs ? (
        <ListGroup
          variant="link"
          items={jobs.map((job) => ({
            label: job.title,
            to: `/careers/${job.id}`,
          }))}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};
