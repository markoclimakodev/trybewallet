// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { REQUEST_ERROR, REQUEST_SUCCESS, UPDATE_EXPENSES } from '../actions';

const WALLET_INITAL = {
  currencies: [],
  expenses: [],
};

const walletReducer = (
  state = WALLET_INITAL,
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
    default:
      return state;
  }
};

export default walletReducer;
