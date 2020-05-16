import { AllJobs } from 'modules/career/components/all-jobs';
import { CareerPageWrapper } from 'modules/career/components/career-page-wrapper';
import * as React from 'react';

export default function CareersPage() {
  return (
    <CareerPageWrapper>
      <AllJobs />
    </CareerPageWrapper>
  );
}
