import * as React from 'react';
import { useHistory } from 'react-router-dom';

export const useScrollTopOnNavigate = () => {
  const history = useHistory();

  React.useEffect(
    () =>
      history.listen((_: unknown, action: string) => {
        if (action !== 'POP') {
          window.scrollTo(0, 0);
        }
      }),
    [history]
  );
};
