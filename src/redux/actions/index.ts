import { UserLoginData } from '../../types/redux';
import { USER_LOGIN } from './userLogin';

export const userLogin = (userLoginData: UserLoginData) => ({
  type: USER_LOGIN,
  payload: userLoginData,
});
