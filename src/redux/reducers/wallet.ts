import { AnyAction } from 'redux';
import { WalletData } from '../../types';
import {
  DELETE_EXPENSE, REQUEST_ERROR, REQUEST_SUCCESS, UPDATE_EXPENSES,
} from '../actions';

const WALLET_INITAL = {
  currencies: [],
  expenses: [],
};

const walletReducer = (
  state:WalletData = WALLET_INITAL,
  action:AnyAction,
) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case UPDATE_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
      };

    default:
      return state;
  }
};

export default walletReducer;
