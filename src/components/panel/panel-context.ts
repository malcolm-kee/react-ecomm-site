import * as React from 'react';

export type PanelColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | undefined;

export const PanelContext = React.createContext<PanelColor>(undefined);
