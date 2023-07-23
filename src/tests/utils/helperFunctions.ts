import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  BTN_ADD,
  BTN_EDIT,
  CURRENCY_SELECT,
  DESCRIPTION_INPUT,
  EMAIL_FIELD,
  EMAIL_INPUT,
  HEADER_CURRENCY_FIELD,
  LOGIN_BUTTON,
  METHOD_SELECT,
  PASSWORD_INPUT,
  TAG_SELECT,
  VALUE_INPUT,
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

export const checkUIElementsArePresent = () => {
  const userEmailField = screen.getByTestId(EMAIL_FIELD);
  const headerCurrencyField = screen.getByTestId(HEADER_CURRENCY_FIELD);
  const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
  const tagSelect = screen.getByTestId(TAG_SELECT);
  const valueInput = screen.getByTestId(VALUE_INPUT);
  const methodSelect = screen.getByTestId(METHOD_SELECT);
  const currencySelect = screen.getByTestId(CURRENCY_SELECT);
  const expenseTable = screen.getByRole('table');
  const addExpenseBtn = screen.getByRole('button', {
    name: BTN_ADD,
  });
  const uiElementes = [
    userEmailField,
    headerCurrencyField,
    descriptionInput,
    tagSelect,
    valueInput,
    methodSelect,
    currencySelect,
    addExpenseBtn,
    expenseTable,
  ];
  uiElementes.forEach((uiElement) => expect(uiElement).toBeInTheDocument());
};

type ExpenseValues = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag:string,
};

export const assertFormValues = async (values: ExpenseValues) => {
  const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
  const tagSelect = screen.getByTestId(TAG_SELECT);
  const valueInput = screen.getByTestId(VALUE_INPUT);
  const methodSelect = screen.getByTestId(METHOD_SELECT);
  const currencySelect = screen.getByTestId(CURRENCY_SELECT);

  expect(descriptionInput).toHaveValue(values.description);
  expect(tagSelect).toHaveValue(values.tag);
  expect(valueInput).toHaveValue(values.value);
  expect(methodSelect).toHaveValue(values.method);
  await waitFor(() => {
    expect(currencySelect).toHaveValue(values.currency);
  });
};

export const simulateUserTypingOnExpenseForm = async (values:ExpenseValues) => {
  const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT);
  const tagSelect = screen.getByTestId(TAG_SELECT);
  const valueInput = screen.getByTestId(VALUE_INPUT);
  const methodSelect = screen.getByTestId(METHOD_SELECT);
  const currencySelect = screen.getByTestId(CURRENCY_SELECT);

  await userEvent.type(descriptionInput, values.description);
  await userEvent.selectOptions(tagSelect, values.tag);
  await userEvent.type(valueInput, values.value);
  await userEvent.selectOptions(methodSelect, values.method);
  await waitFor(() => {
    userEvent.selectOptions(currencySelect, values.currency);
  });
};

export const simulateUserClickingOnAddExpenseButton = async () => {
  const addExpenseBtn = screen.getByRole('button', {
    name: BTN_ADD,
  });

  await userEvent.click(addExpenseBtn);
};

export const assertExpensesWereAdded = async (expense: string[]) => {
  expense.forEach(async (expenseData) => {
    const expenseInfo = await screen.findByText(expenseData);
    expect(expenseInfo).toBeInTheDocument();
  });
};

export const assertExpensesWereDeleted = async (expense: string) => {
  const deletedExpense = screen.queryByTestId(expense);
  expect(deletedExpense).not.toBeInTheDocument();
};

export const simulateUserActivingEditMode = async () => {
  const editModeBtn = await screen.findByTestId(BTN_EDIT);
  expect(editModeBtn).toBeInTheDocument();
  await userEvent.click(editModeBtn);
};
