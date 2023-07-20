// Esse reducer será responsável por tratar as informações da pessoa usuária

import { AnyAction } from 'redux';
import { UserLoginData } from '../../types';
import { USER_LOGIN } from '../actions';

export const USER_LOGIN_INITIAL_STATE: UserLoginData = {
  email: '',
  password: '',
};

const user = (
  state: UserLoginData = USER_LOGIN_INITIAL_STATE,
  action:AnyAction,
) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state, ...action.payload,
      };
    default:
      return state;
  }
};

export default user;
