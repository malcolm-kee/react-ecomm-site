import * as React from 'react';
import { scrollTo } from '../lib/scroll-to';

export const useScrollOnMount = <ScrollTarget extends HTMLElement>() => {
  const sectionRef = React.useRef<ScrollTarget>(null);

  React.useEffect(() => {
    scrollTo(sectionRef.current);
  }, []);

  return sectionRef;
};
