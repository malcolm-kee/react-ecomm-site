import { CareerPageWrapper } from 'modules/career/components/career-page-wrapper';
import { JobDetails } from 'modules/career/components/job-details';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function JobDetailsPage() {
  const { query } = useRouter();

  return (
    <CareerPageWrapper>
      <JobDetails jobId={Number(query.jobId)} />
    </CareerPageWrapper>
  );
}
