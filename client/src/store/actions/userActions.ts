import { UserLogin, UserRegister } from '../../models/user.ts';

// action types
export const USER_ACTIONS = {
  LOGIN_ASYNC: 'LOGIN_ASYNC',
  REGISTER_ASYNC: 'REGISTER_ASYNC',
  LOGOUT_ASYNC: 'LOGOUT_ASYNC',
  GET_LOGGED_IN_USER_ASYNC: 'GET_LOGGED_IN_USER_ASYNC',
  REFRESH_TOKEN_ASYNC: 'REFRESH_TOKEN_ASYNC',
};

// payload types
export interface LoginAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserLogin;
}
export interface RegisterAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserRegister;
}
