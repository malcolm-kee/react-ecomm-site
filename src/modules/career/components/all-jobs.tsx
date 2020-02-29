import * as React from 'react';
import { getJobs } from '../career.service';
import { Job } from '../career.type';
import { ListGroup } from '../../../components/list-group';
import { UiStatus } from '../../../type';
import { Spinner } from '../../../components/spinner';

export const AllJobs = () => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [jobs, setJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    getJobs()
      .then(allJobs => {
        setJobs(allJobs);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return (
    <div>
      {status === 'busy' && <Spinner />}
      <ListGroup
        variant="link"
        items={jobs.map(job => ({
          label: job.title,
          to: `/careers/${job.id}`,
        }))}
      />
    </div>
  );
};
