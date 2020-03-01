import * as React from 'react';
import { noop } from '../lib/fn-lib';

export type LayoutType = 'default' | 'plain';

export type LayoutContextValue = [LayoutType, (type: LayoutType) => void];

export const LayoutContext = React.createContext<LayoutContextValue>([
  'default',
  noop,
]);

LayoutContext.displayName = 'Layout';

export const usePlainLayout = () => {
  const [layoutType, setLayoutType] = React.useContext(LayoutContext);

  React.useEffect(() => {
    setLayoutType('plain');

    return () => {
      setLayoutType('default');
    };
  }, [setLayoutType]);

  return layoutType;
};
