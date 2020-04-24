import * as React from 'react';
import { ListGroup } from '../../../components/list-group';
import { Spinner } from '../../../components/spinner';
import { getJobs } from '../career.service';

export const AllJobs = () => {
  const [status, setStatus] = React.useState('busy');
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    getJobs()
      .then((allJobs) => {
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
        items={jobs.map((job) => ({
          label: job.title,
          to: `/careers/${job.id}`,
        }))}
      />
    </div>
  );
};
