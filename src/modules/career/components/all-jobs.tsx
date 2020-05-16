import { ListGroup } from 'components/list-group';
import * as React from 'react';
import { Job } from '../career.type';

export const AllJobs = (props: { jobs: Job[] }) => {
  return (
    <div>
      <ListGroup
        variant="link"
        items={props.jobs.map((job) => ({
          label: job.title,
          href: '/careers/[jobId]',
          as: `/careers/${job.id}`,
        }))}
      />
    </div>
  );
};
