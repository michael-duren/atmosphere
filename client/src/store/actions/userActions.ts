import { UserFormValues } from '../../models/user.ts';

export const USER_ACTIONS = {
  LOGIN_ASYNC: 'LOGIN_ASYNC',
  REGISTER_ASYNC: 'REGISTER_ASYNC',
};

export interface LoginAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserFormValues;
}
export interface RegisterAsync {
  type: typeof USER_ACTIONS.LOGIN_ASYNC;
  payload: UserFormValues;
}
