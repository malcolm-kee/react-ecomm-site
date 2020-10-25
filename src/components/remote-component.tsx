import * as React from 'react';
import { useScript } from '../hooks/use-script';
import { Spinner } from './spinner';
import { Alert } from './alert';

export type RemoteComponentProps = {
  url: string;
  scope: string;
  module: string;
  [otherProps: string]: any;
};

export const RemoteComponent = ({
  url,
  scope,
  module,
  ...otherProps
}: RemoteComponentProps) => {
  const loaded = !!(window as any)[scope];

  const scriptStatus = useScript(url, {
    disabled: loaded,
  });

  if (scriptStatus === 'loading' && !loaded) {
    return <Spinner />;
  }

  if (scriptStatus === 'error' && !loaded) {
    return <Alert color="danger">Fail to load from {url}</Alert>;
  }

  const Component = React.lazy(
    () =>
      new Promise((fulfill) => {
        // if (loaded) {
        //   return (window as any)[scope]
        //     .get(module)
        //     .then((factory: any) => fulfill(factory()));
        // }

        const react = require('react');
        const legacyShareScope = {
          react: {
            [react.version]: {
              get: () => Promise.resolve(() => react),
              loaded: true,
              from: 'webpack4',
            },
          },
        };

        Promise.resolve((window as any)[scope].init(legacyShareScope)).then(
          () => {
            (window as any)[scope]
              .get(module)
              .then((factory: any) => fulfill(factory()));
          }
        );
      })
  );

  return (
    <React.Suspense fallback={<Spinner />}>
      <Component {...otherProps} />
    </React.Suspense>
  );
};
