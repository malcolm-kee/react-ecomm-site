import * as React from 'react';
import { useCallbackProp } from './use-callback-props';

type Status = 'loading' | 'error' | 'success';
type Options = {
  onSuccess?: () => void;
  onError?: () => void;
  cleanup?: boolean;
  disabled?: boolean;
};

export const useScript = (
  src: string,
  { onSuccess, onError, cleanup, disabled }: Options = {}
) => {
  const [loadState, setLoadState] = React.useState<Status>('loading');
  const onSuccessCb = useCallbackProp(onSuccess);
  const onErrorCb = useCallbackProp(onError);

  React.useEffect(() => {
    if (disabled) {
      return;
    }

    setLoadState('loading');
    const script = document.createElement('script');
    script.onload = () => {
      setLoadState('success');
      onSuccessCb();
    };
    script.onerror = () => {
      setLoadState('error');
      onErrorCb();
    };
    script.src = src;
    document.body.append(script);

    return cleanup
      ? () => {
          document.body.removeChild(script);
        }
      : undefined;
  }, [src, onSuccessCb, onErrorCb, cleanup, disabled]);

  return loadState;
};
