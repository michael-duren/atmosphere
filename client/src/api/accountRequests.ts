import { requests } from './base.ts';
import { User, UserLogin, UserRegister } from '../models/user.ts';

// user specific requests
export const Account = {
  getCurrentUser: () => requests.get<User>('account'),
  login: (user: UserLogin) => requests.post<User>('/account/login', user),
  register: (user: UserRegister) =>
    requests.post<User>('/account/register', user),
  refreshToken: () => requests.post<User>('/account/refresh-token', {}),
};
