import React from 'react';
import { scrollTo } from '../lib/scroll-to';

export const useScrollOnMount = () => {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    scrollTo(sectionRef.current);
  }, []);

  return sectionRef;
};
