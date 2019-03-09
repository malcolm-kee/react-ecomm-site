// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig } from 'axios';

/**
 *
 * @param {AxiosRequestConfig} request
 */
export function ajax(request) {
  return axios(request).then(function processResponse(res) {
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      console.error('Response status code not ok', res.status);
      console.error(res);
      throw new Error(res.statusText);
    }
  });
}
