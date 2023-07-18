import axios, { AxiosResponse } from 'axios';
import { User, UserLogin, UserRegister } from '../models/user.ts';
import { store } from '../store/store.ts';

// set default base
axios.defaults.baseURL = 'http://localhost:5000/api';
// parse data from response
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// attach token to axios request if there is one
axios.interceptors.request.use((config) => {
  const token = store.getState().common.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// user specific requests
const Account = {
  getCurrentUser: () => requests.get<User>('account'),
  login: (user: UserLogin) => requests.post<User>('/account/login', user),
  register: (user: UserRegister) =>
    requests.post<User>('/account/register', user),
};

const agent = {
  Account,
};

export default agent;
