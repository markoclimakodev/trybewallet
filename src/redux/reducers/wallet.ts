import { AnyAction } from 'redux';
import { WalletData } from '../../types';
import {
  CANCEL_EDITING_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE_MODE,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  START_EDITING_EXPENSE,
  UPDATE_EDITED_EXPENSE,
  UPDATE_EXPENSES,
} from '../actions';
import {
  handleCanelEditingExpense,
  handleDeleteExpense,
  handleEditExpenseMode,
  handleEditedExpense,
  handleRequestError,
  handleRequestSuccess,
  handleStartEditingExpense,
  handleUpdateExpenses,
} from './helpers/handlerWalletActions';

const WALLET_INITAL = {
  currencies: [],
  expenses: [],
  editMode: false,
  expenseToEdit: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    id: 0,
  },
};
const walletReducer = (
  state:WalletData = WALLET_INITAL,
  action:AnyAction,
) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return handleRequestSuccess(state, action);

    case REQUEST_ERROR:
      return handleRequestError(state, action);

    case UPDATE_EXPENSES:
      return handleUpdateExpenses(state, action);

    case DELETE_EXPENSE:
      return handleDeleteExpense(state, action);
    case EDIT_EXPENSE_MODE:
      return handleEditExpenseMode(state, action);

    case START_EDITING_EXPENSE:
      return handleStartEditingExpense(state, action);

    case UPDATE_EDITED_EXPENSE:
      return handleEditedExpense(state, action);

    case CANCEL_EDITING_EXPENSE:
      return handleCanelEditingExpense(state);

    default:
      return state;
  }
};

export default walletReducer;
