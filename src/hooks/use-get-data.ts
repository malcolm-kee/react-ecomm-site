import * as React from 'react';
import { xhrX, FetchInit } from '../lib/ajax';
import { UiStatus } from '../type';

export function useGetData<DataType>(
  url: string,
  initialData: DataType | (() => DataType),
  params?: FetchInit['params']
) {
  const [data, setData] = React.useState(initialData);
  const [status, setStatus] = React.useState<UiStatus>('busy');

  React.useEffect(() => {
    const { xhr, fetch } = xhrX(url, { json: true, params });
    fetch()
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));

    return () => {
      xhr.abort();
    };
  }, [url, params]);

  return {
    data,
    status,
  };
}
