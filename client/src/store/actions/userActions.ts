import { UserLogin, UserRegister } from '../../models/user.ts';

export const USER_ACTIONS = {
  LOGIN_ASYNC: 'LOGIN_ASYNC',
  REGISTER_ASYNC: 'REGISTER_ASYNC',
  LOGOUT_ASYNC: 'LOGOUT_ASYNC',
  GET_LOGGED_IN_USER_ASYNC: 'GET_LOGGED_IN_USER_ASYNC',
};

export interface LoginAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserLogin;
}
export interface RegisterAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserRegister;
}

export interface LogoutAsync {
  type: typeof USER_ACTIONS.LOGOUT_ASYNC;
}
