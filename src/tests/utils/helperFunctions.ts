import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  EMAIL_INPUT,
  LOGIN_BUTTON,
  PASSWORD_INPUT,
} from './constantes';

export const simulateUserTyping = async (testEmail:string, TestPassword:string) => {
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
