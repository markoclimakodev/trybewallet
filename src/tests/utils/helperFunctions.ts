import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  BTN_ADD,
  CURRENCY_SELECT,
  DESCRIPTION_INPUT,
  EMAIL_INPUT,
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
