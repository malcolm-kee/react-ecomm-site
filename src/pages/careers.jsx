import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import serverWoman from '../images/server-woman.png';
import { AllJobs } from '../modules/career/components/all-jobs';
import { JobDetails } from '../modules/career/components/job-details';

export const CareersPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="block sm:hidden text-center">
        <img
          src={serverWoman}
          width="300"
          height="300"
          alt=""
          className="mx-auto"
        />
      </div>
      <div className="sm:flex items-center">
        <div className="flex-1 text-center sm:text-right">
          <h1 className="text-4xl sm:text-5xl text-gray-700">
            Careers in Shopit
          </h1>
          <p>Change the World, Differently</p>
        </div>
        <div className="hidden sm:block flex-1">
          <img src={serverWoman} width="600" height="600" alt="" />
        </div>
      </div>
      <div>
        <Switch>
          <Route
            path="/careers/:jobId"
            render={({ match }) => <JobDetails jobId={match.params.jobId} />}
          />
          <Route component={AllJobs} />
        </Switch>
      </div>
    </div>
  );
};
