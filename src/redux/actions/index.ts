import { fetchCurrencyAcronyms } from '../../services/api';
import { Dispatch, ExpensesData, UserLoginData } from '../../types';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_MODE = 'EDIT_EXPENSE_MODE';
export const START_EDITING_EXPENSE = 'START_EDITING_EXPENSE';
export const CANCEL_EDITING_EXPENSE = 'CANCEL_EDITING_EXPENSE';
export const UPDATE_EDITED_EXPENSE = 'UPDATE_EDITED_EXPENSE';

export const userLogin = (userLoginData: UserLoginData) => ({
  type: USER_LOGIN,
  payload: userLoginData,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const requestSuccess = (currencies: string[]) => ({
  type: REQUEST_SUCCESS,
  payload: currencies,
});

export const requestError = (error: any) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const getCurrencies:any = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestCurrencies());
      const currencies = await fetchCurrencyAcronyms();
      dispatch(requestSuccess(currencies));
    } catch (error) {
      dispatch(requestError(error));
    }
  };
};

export const updateExpenses = (data:ExpensesData) => ({
  type: UPDATE_EXPENSES,
  payload: data,
});

export const deleteExpense = (id: number) => (
  { type: DELETE_EXPENSE,
    payload: id,
  }
);

export const editExpensionMode = (editMode:boolean) => ({
  type: EDIT_EXPENSE_MODE,
  payload: editMode,
});

export const startEditingExpense = (expenseId: number) => ({
  type: START_EDITING_EXPENSE,
  payload: expenseId,
});

export const cancelEditingExpense = () => ({
  type: CANCEL_EDITING_EXPENSE,
});

export const updateEditedExpense = (updatedExpense: ExpensesData) => ({
  type: UPDATE_EDITED_EXPENSE,
  payload: updatedExpense,
});
