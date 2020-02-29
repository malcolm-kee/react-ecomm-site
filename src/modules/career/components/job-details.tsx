import * as React from 'react';
import { UiStatus } from '../../../type';
import { getJob } from '../career.service';
import { Job } from '../career.type';
import { Spinner } from '../../../components/spinner';
import { Button } from '../../../components/button';
import { scrollTo } from '../../../lib/scroll-to';
import { Alert } from '../../../components/alert';

export const JobDetails = (props: { jobId: number }) => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [job, setJob] = React.useState<Job | null>(null);
  React.useEffect(() => {
    setStatus('busy');
    getJob(props.jobId)
      .then(jobDetails => {
        setJob(jobDetails);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [props.jobId]);

  const jobDetailsRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (status === 'idle') {
      scrollTo(jobDetailsRef.current);
    }
  }, [status]);

  return (
    <div>
      {status === 'busy' && <Spinner />}
      {status === 'error' && (
        <Alert color="danger">Fails to get details.</Alert>
      )}
      {job && (
        <section ref={jobDetailsRef} className="max-w-xl my-10 px-3 mx-auto">
          <h2 className="text-4xl mb-2">{job.title}</h2>
          <div className="my-4">
            <div className="text-xl">
              <span className="font-bold pr-2">Department:</span>
              <span>{job.department}</span>
            </div>
            <div className="text-xl">
              <span className="font-bold pr-2">Level:</span>
              <span>{job.level}</span>
            </div>
          </div>
          <h3 className="text-lg">Descriptions</h3>
          <ul className="list-disc pl-5 mb-4">
            {job.descriptions.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
          <h3 className="text-lg">Requirements</h3>
          <ul className="list-disc pl-5 mb-4">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
          <div className="flex items-center my-5">
            <Button size="lg" disabled>
              Apply
            </Button>
            <p className="inline-block ml-4 text-red-800">
              No opening at the moment.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
