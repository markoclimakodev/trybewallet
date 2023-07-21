import { AnyAction } from 'redux';
import { WalletData, formInitalValues } from '../../../types';

export const handleRequestSuccess = (state: WalletData, action: AnyAction) => ({
  ...state,
  currencies: action.payload,
});

export const handleRequestError = (state: WalletData, action: AnyAction) => ({
  ...state,
  error: action.payload.error,
});

export const handleUpdateExpenses = (state: WalletData, action: AnyAction) => ({
  ...state,
  expenses: [...state.expenses, action.payload],
});

export const handleDeleteExpense = (state: WalletData, action: AnyAction) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

export const handleEditExpenseMode = (state: WalletData, action: AnyAction) => ({
  ...state,
  editMode: action.payload,
});

export const handleStartEditingExpense = (state: WalletData, action: AnyAction) => {
  const expenseIdToEdit = action.payload;
  const expenseToEdit = state.expenses.find((expense) => expense.id === expenseIdToEdit);
  if (expenseToEdit) {
    return {
      ...state,
      expenseToEdit: {
        ...expenseToEdit,
      },
    };
  }
  return state;
};

export const handleEditedExpense = (state: WalletData, action: AnyAction) => {
  const updatedExpense = action.payload;
  const expenses = state.expenses
    .map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense));

  return {
    ...state,
    expenses,
    expenseToEdit: {
      ...formInitalValues,
    },
  };
};

export const handleCanelEditingExpense = (state: WalletData) => {
  return {
    ...state,
    editMode: false,
  };
};
