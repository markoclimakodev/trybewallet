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
import { currenciesOptions } from './utils/currencies';
import { expenseTest } from './utils/expenseTest';

describe('Api request actions', () => {
  it('should create the requestCurrencies action', () => {
    const action = requestCurrencies();
    expect(action).toEqual({ type: REQUEST_CURRENCIES });
  });

  it('should create the requestSuccess action', () => {
    const currencies = currenciesOptions;
    const action = requestSuccess(currencies);
    expect(action).toEqual({ type: REQUEST_SUCCESS, payload: currencies });
  });

  it('should create the requestError action', () => {
    const error = 'Erro ao fazer a requisição';
    const action = requestError(error);
    expect(action).toEqual({ type: REQUEST_ERROR, payload: error });
  });
});

describe('Create and delete actions', () => {
  it('should create the updateExpenses action', () => {
    const expensesData = expenseTest;
    const action = updateExpenses(expensesData);
    expect(action).toEqual({ type: UPDATE_EXPENSES, payload: expensesData });
  });

  it('should create the deleteExpense action', () => {
    const expenseId = 1;
    const action = deleteExpense(expenseId);
    expect(action).toEqual({ type: DELETE_EXPENSE, payload: expenseId });
  });
});

describe('Expense editing actions', () => {
  it('should create editExpensionMode action', () => {
    const editMode = true;
    const action = editExpensionMode(editMode);
    expect(action).toEqual({ type: EDIT_EXPENSE_MODE, payload: editMode });
  });

  it('should create the startEditingExpense action', () => {
    const expenseId = 1;
    const action = startEditingExpense(expenseId);
    expect(action).toEqual({ type: START_EDITING_EXPENSE, payload: expenseId });
  });

  it('should create the cancelEditingExpense action', () => {
    const action = cancelEditingExpense();
    expect(action).toEqual({ type: CANCEL_EDITING_EXPENSE });
  });

  it('should create the updateEditedExpense action', () => {
    const updatedExpense = expenseTest;
    const action = updateEditedExpense(updatedExpense);
    expect(action).toEqual({ type: UPDATE_EDITED_EXPENSE, payload: updatedExpense });
  });
});
