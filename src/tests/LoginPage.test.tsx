import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import LoginForm from '../components/LoginForm';
import Login from '../pages/Login';
import { INVALID_EMAIL, INVALID_PASSWORD, LOGIN_BUTTON, LOGIN_EMAIL_INPUT_ID, LOGIN_PASSWORD_INPUT_ID, LOGO_ID, VALID_EMAIL, VALID_PASSWORD } from './utils/constantes';

describe('Test UI Elements on Login Page', () => {
  it('should have a logo', () => {
    renderWithRouterAndRedux(<Login />);

    const logo = screen.getByTestId(LOGO_ID);
    expect(logo).toBeInTheDocument();
  });

  it('should have an email input field', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    expect(emailInput).toBeInTheDocument();
  });

  it('should have a password input field', () => {
    renderWithRouterAndRedux(<Login />);

    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should have a login button', () => {
    renderWithRouterAndRedux(<Login />);

    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });
    expect(loginButton).toBeInTheDocument();
  });
});

describe('User Actions on Login Page', () => {
  it('should fill in the email and password fields with typed text', async () => {
    renderWithRouterAndRedux(<LoginForm />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(passwordInput, VALID_PASSWORD);

    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue(VALID_PASSWORD);
  });

  it('should disable the button if both email and password are invalid', async () => {
    renderWithRouterAndRedux(<LoginForm />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, INVALID_EMAIL);
    await userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(emailInput).toHaveValue(INVALID_EMAIL);
    expect(passwordInput).toHaveValue(INVALID_PASSWORD);

    expect(loginButton).toBeDisabled();
  });

  it('should disable the button if email is invalid and password is valid', async () => {
    renderWithRouterAndRedux(<LoginForm />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, INVALID_EMAIL);
    await userEvent.type(passwordInput, VALID_PASSWORD);

    expect(emailInput).toHaveValue(INVALID_EMAIL);
    expect(passwordInput).toHaveValue(VALID_PASSWORD);

    expect(loginButton).toBeDisabled();
  });

  it('should disable the button if email is valid and password is invalid', async () => {
    renderWithRouterAndRedux(<LoginForm />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue(INVALID_PASSWORD);

    expect(loginButton).toBeDisabled();
  });

  it('should enable the button if both email and password are valid', async () => {
    renderWithRouterAndRedux(<LoginForm />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(passwordInput, VALID_PASSWORD);

    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue(VALID_PASSWORD);

    expect(loginButton).toBeEnabled();
  });

  it('should be directed to "/carteira" when clicking the "entrar" button if it is enabled', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: LOGIN_BUTTON });

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(passwordInput, VALID_PASSWORD);

    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(passwordInput).toHaveValue(VALID_PASSWORD);

    expect(loginButton).toBeEnabled();

    await userEvent.click(loginButton);
    const userEmail = screen.getByRole('heading', { name: VALID_EMAIL });
    expect(userEmail).toBeInTheDocument();
  });
});
