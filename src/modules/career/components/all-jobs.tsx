import * as React from 'react';
import { ListGroup } from '../../../components/list-group';
import { Spinner } from '../../../components/spinner';
import { useJobs } from '../career.service';

export const AllJobs = () => {
  const { jobs, status } = useJobs();

  return (
    <div>
      {status === 'busy' && <Spinner />}
      <ListGroup
        variant="link"
        items={jobs.map((job) => ({
          label: job.title,
          to: `/careers/${job.id}`,
        }))}
      />
    </div>
  );
};
