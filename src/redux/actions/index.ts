import { UserLoginData } from '../../types/redux';

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (userLoginData: UserLoginData) => ({
  type: USER_LOGIN,
  payload: userLoginData,
});
