import { Button } from 'components/button';
import { Seo } from 'components/seo';
import { Spinner } from 'components/spinner';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RemoteComponent } from '../components/remote-component';
import serverWoman from '../images/server-woman.png';
import { AllJobs } from '../modules/career/components/all-jobs';
import { JobDetails } from '../modules/career/components/job-details';

export const CareersPage = () => {
  const [showNewUi, setShowNewUi] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <Seo title="Careers - Shopit" />
      {showNewUi ? (
        <React.Suspense fallback={<Spinner />}>
          <RemoteComponent
            url="https://federation-career-app.vercel.app/remoteEntry.js"
            scope="career"
            module="./career"
          />
        </React.Suspense>
      ) : (
        <div className="relative">
          <div className="block sm:hidden text-center">
            <img
              src={serverWoman}
              width="300"
              height="300"
              alt=""
              className="mx-auto"
            />
          </div>
          <Button
            onClick={() => setShowNewUi(true)}
            color="primary"
            className="absolute top-0 right-0 mt-3 mr-4"
          >
            Switch to New UI
          </Button>
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
                render={({ match }) => (
                  <JobDetails jobId={match.params.jobId} />
                )}
              />
              <Route component={AllJobs} />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
};
