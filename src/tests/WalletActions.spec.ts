import {
  CANCEL_EDITING_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE_MODE,
  REQUEST_CURRENCIES,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  START_EDITING_EXPENSE,
  UPDATE_EDITED_EXPENSE,
  UPDATE_EXPENSES,
  cancelEditingExpense,
  deleteExpense,
  editExpensionMode,
  requestCurrencies,
  requestError,
  requestSuccess,
  startEditingExpense,
  updateEditedExpense,
  updateExpenses,
} from '../redux/actions';
import { acronymsData } from './helpers/mockData';
import { expenseData } from './mocks/expneseData';

describe('Api request Actions', () => {
  it('Should create the requestCurrencies action', () => {
    const action = requestCurrencies();
    expect(action).toStrictEqual({ type: REQUEST_CURRENCIES });
  });

  it('Should create the requestSuccess action', () => {
    const currencies = acronymsData;
    const action = requestSuccess(currencies);
    expect(action).toStrictEqual({ type: REQUEST_SUCCESS, payload: currencies });
  });

  it('Should create the requestError action', () => {
    const error = 'Erro ao fazer a requisição';
    const action = requestError(error);
    expect(action).toStrictEqual({ type: REQUEST_ERROR, payload: error });
  });
});

describe('Create and delete actions', () => {
  it('Should create the updateExpenses action', () => {
    const expensesData = expenseData;
    const action = updateExpenses(expensesData);
    expect(action).toStrictEqual({ type: UPDATE_EXPENSES, payload: expensesData });
  });

  it('Should create the deleteExpense action', () => {
    const expenseId = 1;
    const action = deleteExpense(expenseId);
    expect(action).toStrictEqual({ type: DELETE_EXPENSE, payload: expenseId });
  });
});

describe('Expense editing actions', () => {
  it('Should create editExpensionMode action', () => {
    const editMode = true;
    const action = editExpensionMode(editMode);
    expect(action).toStrictEqual({ type: EDIT_EXPENSE_MODE, payload: editMode });
  });

  it('Should create the startEditingExpense action', () => {
    const expenseId = 1;
    const action = startEditingExpense(expenseId);
    expect(action).toStrictEqual({ type: START_EDITING_EXPENSE, payload: expenseId });
  });

  it('Should create the cancelEditingExpense action', () => {
    const action = cancelEditingExpense();
    expect(action).toStrictEqual({ type: CANCEL_EDITING_EXPENSE });
  });

  it('Should create the updateEditedExpense action', () => {
    const updatedExpense = expenseData;
    const action = updateEditedExpense(updatedExpense);
    expect(action).toStrictEqual({ type: UPDATE_EDITED_EXPENSE, payload: updatedExpense });
  });
});
