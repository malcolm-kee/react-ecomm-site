import { getJobs } from 'modules/career/career.service';
import { Job } from 'modules/career/career.type';
import { AllJobs } from 'modules/career/components/all-jobs';
import { CareerPageWrapper } from 'modules/career/components/career-page-wrapper';
import type { GetStaticProps } from 'next';
import * as React from 'react';

function CareersPage(props: { jobs: Job[] }) {
  return (
    <CareerPageWrapper>
      <AllJobs jobs={props.jobs} />
    </CareerPageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { jobs: await getJobs() },
  };
};

export default CareersPage;
