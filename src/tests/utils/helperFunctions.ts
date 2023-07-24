import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { FormData } from '../mocks/filledData';
import {
  BTN_ADD,
  BTN_CANCEL_EDIT,
  BTN_DELETE,
  BTN_EDIT_EXPENSE,
  EMAIL_INPUT,
  LOGIN_BUTTON,
  PASSWORD_INPUT,
} from './constantes';

export const simulateUserTypingOnLoginPage = async (
  testEmail:string,
  TestPassword:string,
) => {
  const email = screen.getByTestId(EMAIL_INPUT);
  const password = screen.getByTestId(PASSWORD_INPUT);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  await userEvent.type(email, testEmail);
  await userEvent.type(password, TestPassword);
};

export const checkLoginButtonIsDisabled = () => {
  const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

  expect(loginBtn).toBeInTheDocument();
  expect(loginBtn).toBeDisabled();
};

export const checkLoginButtonIsEnabled = () => {
  const loginBtn = screen.getByRole('button', { name: LOGIN_BUTTON });

  expect(loginBtn).toBeInTheDocument();
  expect(loginBtn).toBeEnabled();
};

export const checkIfTableIsPresent = () => {
  const expenseTable = screen.getByRole('table');
  const descriptionColumn = screen.getByRole('columnheader', { name: /descrição/i });
  const tagColumn = screen.getByRole('combobox', { name: /categoria da despesa/i });
  const methodColumn = screen.getByRole('columnheader', { name: /método de pagamento/i });
  const valueColumn = screen.getByRole('columnheader', { name: /editar\/excluir/i });
  const exchangeRateColumn = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
  const convertedValueColumn = screen.getByRole('columnheader', { name: /valor convertido/i });
  const conversionCurrencyColumn = screen.getByRole('columnheader', { name: /moeda de conversão/i });
  const editDeleteColumn = screen.getByRole('columnheader', { name: /editar\/excluir/i });
  const expenseTableElements = [
    expenseTable,
    descriptionColumn,
    tagColumn,
    methodColumn,
    valueColumn,
    exchangeRateColumn,
    convertedValueColumn,
    conversionCurrencyColumn,
    editDeleteColumn,
  ];

  expenseTableElements
    .forEach((tableElement) => expect(tableElement).toBeInTheDocument());
};

export const assertFormValues = async (formData: FormData) => {
  const descriptionInput = screen.getByRole('textbox', { name: /Descrição da despesa/i });
  const tagSelect = screen.getByRole('combobox', { name: /Categoria da despesa/i });
  const valueInput = screen.getByRole('textbox', { name: /valor/i });
  const methodSelect = screen.getByRole('combobox', { name: /Método de pagamento/i });
  const currencySelect = await screen.findByRole('combobox', { name: /Moeda/i });

  expect(descriptionInput).toHaveValue(formData.description);
  expect(tagSelect).toHaveValue(formData.tag);
  expect(valueInput).toHaveValue(formData.value);
  expect(methodSelect).toHaveValue(formData.method);
  expect(currencySelect).toHaveValue(formData.currency);
};

export const simulateUserTyping = async (formData: FormData) => {
  const descriptionInput = screen.getByRole('textbox', { name: /Descrição da despesa/i });
  const tagSelect = screen.getByRole('combobox', { name: /Categoria da despesa/i });
  const valueInput = screen.getByRole('textbox', { name: /valor/i });
  const methodSelect = screen.getByRole('combobox', { name: /Método de pagamento/i });
  const currencySelect = await screen.findByRole('combobox', { name: /Moeda/i });
  await userEvent.type(descriptionInput, formData.description);
  await userEvent.selectOptions(tagSelect, formData.tag);
  await userEvent.type(valueInput, formData.value);
  await userEvent.selectOptions(methodSelect, formData.method);
  await userEvent.selectOptions(currencySelect, formData.currency);
};

export const assertFormTypedValues = async (formData: FormData) => {
  const descriptionInput = screen.getByRole('textbox', { name: /Descrição da despesa/i });
  const tagSelect = screen.getByRole('combobox', { name: /Categoria da despesa/i });
  const valueInput = screen.getByRole('textbox', { name: /valor/i });
  const methodSelect = screen.getByRole('combobox', { name: /Método de pagamento/i });
  const currencySelect = await screen.findByRole('combobox', { name: /Moeda/i });

  await waitFor(() => {
    expect(descriptionInput).toHaveValue(formData.description);
    expect(tagSelect).toHaveValue(formData.tag);
    expect(valueInput).toHaveValue(formData.value);
    expect(methodSelect).toHaveValue(formData.method);
    expect(currencySelect).toHaveValue(formData.currency);
  });
};

export const simulateUserAddingAnExpense = async (expense: string[]) => {
  const addExpenseBtn = screen.getByRole('button', {
    name: BTN_ADD,
  });

  await userEvent.click(addExpenseBtn);
  expense.forEach(async (expenseData) => {
    const expenseInfo = await screen.findByRole('cell', {
      name: expenseData,
    });
    expect(expenseInfo).toBeInTheDocument();
  });
};

export const simulateUserEditingAnExpense = async () => {
  const editBtn = await screen.findByTestId('edit-btn');
  expect(editBtn).toBeInTheDocument();
  await userEvent.click(editBtn);
};

export const simulateUserDeletingAnExpense = async (expense: string[]) => {
  const editBtn = await screen.findByTestId(BTN_DELETE);
  await userEvent.click(editBtn);
  expense.forEach(async (expenseData) => {
    const expenseInfo = await screen.findByRole('cell', {
      name: expenseData,
    });
    expect(expenseInfo).not.toBeInTheDocument();
  });
};

export const simulateUserSaveAnEditedExpense = async (expense: string[]) => {
  const saveEdit = screen.getByRole('button', {
    name: BTN_EDIT_EXPENSE,
  });

  await userEvent.click(saveEdit);
  expense.forEach(async (expenseData) => {
    const expenseInfo = await screen.findByText(expenseData);
    expect(expenseInfo).toBeInTheDocument();
  });
};

export const simulateUserCancelExpenseEdit = async () => {
  const cancelEdit = screen.getByRole('button', { name: BTN_CANCEL_EDIT });
  await userEvent.click(cancelEdit);
};
