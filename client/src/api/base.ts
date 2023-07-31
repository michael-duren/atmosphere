import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from '../store/store.ts';
import { USER_ACTIONS } from '../store/actions/userActions.ts';

// set default base
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;
// parse data from response
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// attach token to axios request if there is one
axios.interceptors.request.use((config) => {
  const token = store.getState().common.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// intercept the response
axios.interceptors.response.use(
  (response) => response,
  (e: AxiosError) => {
    const { data, status } = e.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.error) {
          console.log(data.error);
          throw data.error;
        } else {
          throw new Error('Bad Request');
        }
      case 401:
        if (status === 401 && localStorage.getItem('jwt')) {
          store.dispatch({ type: USER_ACTIONS.LOGOUT_ASYNC });
        }
        if (data.error) {
          console.log(data.error);
        }
        break;
    }

    return Promise.reject(data.error);
  }
);
export const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
