import * as React from 'react';
import { useScript } from '../hooks/use-script';
import { Alert } from './alert';
import { Spinner } from './spinner';

export type RemoteComponentProps = {
  url: string;
  scope: string;
  module: string;
  [otherProps: string]: any;
};

/**
 * `<RemoteComponent />` allows us to load module federated modules in webpack 4.
 * It achieves this by using some webpack undocumented API and monkey patching `window` object.
 * If you want to use in production, use at your own risk. 🚨
 */
export const RemoteComponent = ({
  url,
  scope,
  module,
  ...otherProps
}: RemoteComponentProps) => {
  // it is important to load a new set of script so `window[scope]` will be patched with a new instance.
  // but this means potential race condition?
  const scriptStatus = useScript(url, {
    cleanup: true,
  });

  if (scriptStatus === 'loading') {
    return <Spinner />;
  }

  if (scriptStatus === 'error') {
    return <Alert color="danger">Fail to load from {url}</Alert>;
  }

  const Component = React.lazy(
    () =>
      new Promise((fulfill) => {
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

  return <Component {...otherProps} />;
};
