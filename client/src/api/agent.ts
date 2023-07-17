import axios, { AxiosResponse } from 'axios';
import { User, UserLogin, UserRegister } from '../models/user.ts';

axios.defaults.baseURL = 'https://localhost:7190';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>('account'),
  login: (user: UserLogin) => requests.post<User>('/account/login', user),
  register: (user: UserRegister) =>
    requests.post<User>('/account/register', user),
};

const agent = {
  Account,
};

export default agent;
