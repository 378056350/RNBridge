import { LOGIN_LOGIN_ACTION } from '~pages/login/store/types/loginActionTypes';

export const loginAction = (user, pass) => {
  return {
    type: LOGIN_LOGIN_ACTION,
    user,
    pass
  }
}