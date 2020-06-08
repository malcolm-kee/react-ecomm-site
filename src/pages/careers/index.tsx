import { getJobs } from 'modules/career/career.service';
import { Job } from 'modules/career/career.type';
import { AllJobs } from 'modules/career/components/all-jobs';
import { CareerPageWrapper } from 'modules/career/components/career-page-wrapper';
import type { GetServerSideProps } from 'next';
import * as React from 'react';

type PageProps = {
  jobs: Job[];
};

function CareersPage(props: PageProps) {
  return (
    <CareerPageWrapper>
      <AllJobs jobs={props.jobs} />
    </CareerPageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: { jobs: await getJobs() },
  };
};

export default CareersPage;
