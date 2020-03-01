import React from 'react';
import { noop } from '../lib/fn-lib';

export const LayoutContext = React.createContext(['default', noop]);

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
